import fs from "fs";
import Job from "../models/Job.js";
import JobSeeker from "../models/JobSeeker.js";
import JobApplication from "../models/JobApplication.js";
import ParsedResume from "../models/ParsedResume.js";
import { extractTextFromFile } from "../controllers/resumeController.js";

export const applyToJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    if (!jobId) {
      return res.status(400).json({ message: "Job ID is required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Resume file is required" });
    }

    // 1. Check Job Exists
    const job = await Job.findById(jobId);
    if (!job) {
      fs.unlinkSync(req.file.path);
      return res.status(404).json({ message: "Job not found" });
    }

    // 2. Get Job Seeker
    const jobSeeker = await JobSeeker.findOne({
      authUserId: req.user._id,
    });

    if (!jobSeeker) {
      fs.unlinkSync(req.file.path);
      return res.status(404).json({ message: "Job seeker profile not found" });
    }

    // 3. Prevent Duplicate Apply
    const existingApplication = await JobApplication.findOne({
      jobId,
      jobSeekerId: jobSeeker._id,
    });

    if (existingApplication) {
      fs.unlinkSync(req.file.path);
      return res.status(409).json({
        message: "You already applied to this job",
      });
    }

    // 4. Extract Resume Text
    const resumeText = await extractTextFromFile(req.file);

    // 5. Create Job Application
    const application = await JobApplication.create({
      jobId,
      jobSeekerId: jobSeeker._id,
      status: "applied",
    });

    // 6. Store Parsed Resume
    await ParsedResume.create({
      jobApplicationId: application._id,
      jobSeekerId: jobSeeker._id,
      rawTextLength: resumeText.length,
    });

    // 7. Delete Uploaded File
    fs.unlinkSync(req.file.path);

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      applicationId: application._id,
    });

  } catch (error) {
    if (req.file?.path) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({
      message: "Failed to apply",
      error: error.message,
    });
  }
};