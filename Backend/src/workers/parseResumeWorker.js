import { configDotenv } from "dotenv";
configDotenv();

import crypto from "crypto";
import mongoose from "mongoose";

import { getConsumerChannel } from "../services/queue.js";
import { extractTextFromFile } from "../controllers/resumeController.js";
import { parseResume } from "../services/parseResume.js";
import { rankResumes } from "../ai-model/ranking/rankResumes.js";

import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";
import JobSeeker from "../models/JobSeeker.js";
import ParsedResume from "../models/ParsedResume.js";
import InterviewSession from "../models/InterviewSession.js";

import DB_CON from "../db/connection.js";

const FIT_THRESHOLD = Number(process.env.FIT_THRESHOLD || 65);

function buildFileFromPayload(upload) {
  const buffer = Buffer.from(upload.bufferBase64, "base64");

  return {
    buffer,
    mimetype: upload.mimetype,
    originalname: upload.filename,
  };
}

async function processMessage(msg, ch) {
  const content = JSON.parse(msg.content.toString());

  const {
    requestId,
    jobApplicationId,
    jobId,
    jobSeekerId,
    jobDescription,
    upload,
  } = content;

  console.log(`[${requestId}] Received jobApplicationId=${jobApplicationId}`);

  // Idempotency check
  const already = await ParsedResume.findOne({ jobApplicationId });

  if (already) {
    console.log(`[${requestId}] ParsedResume already exists, acking`);
    ch.ack(msg);
    return;
  }

  try {
    const file = buildFileFromPayload(upload);

    /* ---------------- Extract Resume Text ---------------- */
    const text = await extractTextFromFile(file);

    /* ---------------- Parse Resume via LLM ---------------- */
    const { ok, parsed, error } = await parseResume(text);

    if (!ok) {
      throw new Error("Resume parsing failed: " + error);
    }

    /* ---------------- Rank Resume ---------------- */
    const job = await Job.findById(jobId);

    const ranked = await rankResumes(
  [{
    jobApplicationId,
    jobSeekerId,
    text,
    skills: parsed.candidate.skills
  }],
  job.description || "",
  job.skills || []
);

    const top = ranked[0];

    const score = top?.score ?? 0;
    const isFit = score >= FIT_THRESHOLD;

    /* ---------------- Save Parsed Resume ---------------- */
    const parsedResumeDoc = await ParsedResume.create({
      jobApplicationId,
      jobSeekerId,
      rawTextLength: text.length,
      extractedSkills: Array.isArray(parsed?.candidate?.skills)
        ? parsed.candidate.skills
        : [],
      experienceYears: Number.isFinite(parsed?.candidate?.yearsExperience)
        ? parsed.candidate.yearsExperience
        : undefined,
      parsed,
    });

    /* ---------------- Update Application Status ---------------- */
    await JobApplication.findByIdAndUpdate(jobApplicationId, {
      status: isFit ? "applied" : "rejected",
    });

    /* ---------------- Create Interview Session if FIT ---------------- */
    if (isFit) {
      const token = crypto.randomBytes(32).toString("hex");

      const interviewLink = `${process.env.FRONTEND_URL || "http://localhost:5173"
        }/interview/${token}`;

      await InterviewSession.create({
        token,
        jobApplicationId,
        jobId,
        jobSeekerId,
        parsedResumeId: parsedResumeDoc._id,
        interviewLink,
        status: "active",
      });

      console.log(
        `[${requestId}] Candidate FIT. Interview session created`
      );
    }

    console.log(`[${requestId}] Processed. score=${score}, isFit=${isFit}`);

    ch.ack(msg);
  } catch (e) {
    console.error("Worker error:", e);

    // reject message without requeue
    ch.nack(msg, false, false);
  }
}

async function main() {
  await DB_CON();

  const ch = await getConsumerChannel();

  const queueName = process.env.QUEUE_RESUME_PARSE || "resumes.parse";

  console.log("Worker consuming from", queueName);

  ch.consume(queueName, (msg) => processMessage(msg, ch), {
    noAck: false,
  });
}

main().catch((e) => {
  console.error("Worker fatal:", e);
  process.exit(1);
});