import { randomUUID } from "crypto";
import Job from "../models/Job.js";
import JobSeeker from "../models/JobSeeker.js";
import JobApplication from "../models/JobApplication.js";
import { getConfirmChannel } from "../services/queue.js";

export const applyToJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    console.log("body:", req.body);
    console.log("file:", req.file);

    // 0) Basic validations
    if (!jobId) {
      return res.status(400).json({ message: "Job ID is required" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "Resume file is required" });
    }

    // 1) Check job exists
    const job = await Job.findById(jobId);
    if (!job) {
      if (req.file?.path) { try { fs.unlinkSync(req.file.path); } catch { } }
      return res.status(404).json({ message: "Job not found" });
    }

    // 2) Get job seeker via auth user
    //req.user._id
    const jobSeeker = await JobSeeker.findOne({ authUserId: "69945343309b1698a2d64417" });
    if (!jobSeeker) {
      if (req.file?.path) { try { fs.unlinkSync(req.file.path); } catch { } }
      return res.status(404).json({ message: "Job seeker profile not found" });
    }

    // 3) Prevent duplicate apply
    const existingApplication = await JobApplication.findOne({ jobId, jobSeekerId: jobSeeker._id });
    if (existingApplication) {
      if (req.file?.path) { try { fs.unlinkSync(req.file.path); } catch { } }
      return res.status(409).json({ message: "You already applied to this job" });
    }

    // Create Job Application in queued state
    const application = await JobApplication.create({
      jobId,
      jobSeekerId: jobSeeker._id,
      status: "queued",
    });

    // Publish to RabbitMQ (durable)
    const ch = await getConfirmChannel();
    const queueName = process.env.QUEUE_RESUME_PARSE || 'resumes.parse';
    const requestId = randomUUID();
    const payload = {
      requestId,
      jobApplicationId: application._id.toString(),
      jobId: job._id.toString(),
      jobSeekerId: jobSeeker._id.toString(),
      jobTitle: job.title,
      jobDescription: job.description || "",
      upload: {
        filename: req.file.originalname,
        mimetype: req.file.mimetype,
        bufferBase64: Buffer.from(req.file.buffer).toString('base64'),
      },
      enqueuedAt: new Date().toISOString(),
    };

    await new Promise((resolve, reject) => {
      ch.sendToQueue(queueName, Buffer.from(JSON.stringify(payload)), {
        persistent: true,
        contentType: 'application/json',
        correlationId: requestId,
      }, (err, ok) => err ? reject(err) : resolve(ok));
    });

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      job: { id: job._id, title: job.title },
      applicationId: application._id,
      status: "queued",
    });

  } catch (error) {
    if (req.file?.path) { try { fs.unlinkSync(req.file.path); } catch { } }

    return res.status(500).json({
      message: "Failed to apply",
      error: error.message,
    });
  }
};

export const GetAllJobs = async (req, res) => {
  try {
    const allJobs = await Job.find({});

    return res.status(200).json({
      success: true,
      count: allJobs.length,
      jobs: allJobs
    });

  } catch (error) {
    console.log("Failed to load all jobs", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load all jobs"
    });
  }
};



export const jobDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    return res.status(200).json({
      success: true,
      job
    });

  } catch (error) {
    console.log("Failed to fetch job details", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch job details"
    });
  }
};