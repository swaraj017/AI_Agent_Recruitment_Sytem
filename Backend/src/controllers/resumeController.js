import fs from "fs";
import mammoth from "mammoth";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { rankResumes } from "../ai-model/ranking/rankResumes.js";
import ParsedResume from "../models/ParsedResume.js";
import ATSProfile from "../models/ATSProfile.js";
import JobApplication from "../models/JobApplication.js";

/* ------------------ Helpers ------------------ */
const extractTextFromPDF = async (filePath) => {
  const data = new Uint8Array(fs.readFileSync(filePath));
  const pdf = await pdfjsLib.getDocument({ data }).promise;

  let text = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((item) => item.str).join(" ");
  }
  return text;
};

const extractTextFromFile = async (file) => {
  if (file.mimetype === "application/pdf") {
    return await extractTextFromPDF(file.path);
  }
  if (
    file.mimetype ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const data = await mammoth.extractRawText({ path: file.path });
    return data.value;
  }
  throw new Error("Unsupported file type");
};

/* ------------------ Upload Controller ------------------ */
export const uploadAndParseController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const text = await extractTextFromFile(req.file);
    fs.unlinkSync(req.file.path);

    return res.json({
      message: "Resume parsed successfully",
      text,
    });
  } catch (err) {
    if (req.file?.path) fs.unlinkSync(req.file.path);
    return res.status(500).json({
      error: "Parsing failed",
      details: err.message,
    });
  }
};

/* ------------------ Ranking + ATS Controller ------------------ */
const FIT_THRESHOLD = 70; // adjust as needed

export const rankResumesController = async (req, res) => {
  try {
    const { resumes, jobDescription, jobId } = req.body;

    if (!resumes || !jobDescription || !jobId) {
      return res.status(400).json({
        error: "Missing resumes, jobDescription, or jobId",
      });
    }

    const ranked = rankResumes(resumes, jobDescription);
    const results = [];

    for (const r of ranked) {
      const { jobApplicationId, jobSeekerId, text } = r;
      let parsedResumeDoc = null;
      const isFit = r.score >= FIT_THRESHOLD;

      // Only save ParsedResume for fit candidates
      if (isFit) {
        parsedResumeDoc = await ParsedResume.create({
          jobApplicationId,
          jobSeekerId,
          extractedSkills: [], // populate from parser if available
          rawTextLength: text.length,
          parserVersion: "ai-parser-v1",
        });
      }

      // Save ATSProfile always
      const atsProfileDoc = await ATSProfile.create({
        jobApplicationId,
        jobId,
        jobSeekerId,
        atsScore: r.score,
        isFit,
        matchedKeywords: [], // optional: parser output
        missingKeywords: [],
        summary: text.slice(0, 500),
        parsedResumeId: parsedResumeDoc?._id || null,
        parsedBy: "ai-tfidf-v1",
      });

      // Update JobApplication status
      await JobApplication.findByIdAndUpdate(jobApplicationId, {
        status: isFit ? "shortlisted" : "reviewed",
      });

      results.push({
        jobApplicationId,
        jobSeekerId,
        score: r.score,
        isFit,
        atsProfileId: atsProfileDoc._id,
        parsedResumeId: parsedResumeDoc?._id || null,
      });
    }

    return res.json({
      message: "Ranking and ATS processing completed",
      results,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Ranking failed",
      details: error.message,
    });
  }
};
