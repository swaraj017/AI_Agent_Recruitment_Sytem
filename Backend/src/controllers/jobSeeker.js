import fs from "fs";
import JobApplication from "../models/JobApplication.js";
import JobSeeker from "../models/JobSeeker.js";
import { extractTextFromFile } from "./resumeController.js";  

export const applyToJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    if (!jobId) {
      return res.status(400).json({ message: "Job id is required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Resume file is required" });
    }

    // Get job seeker
    const jobSeeker = await JobSeeker.findOne({
      authUserId: req.user._id,
    });

    if (!jobSeeker) {
      return res.status(404).json({ message: "Job seeker profile not found" });
    }

    // Prevent duplicate apply
    const existingApplication = await JobApplication.findOne({
      jobId,
      jobSeekerId: jobSeeker._id,
    });

    if (existingApplication) {
      return res.status(409).json({ message: "You already applied to this job" });
    }

    /* ---------------- Resume Parsing ---------------- */
    const resumeText = await extractTextFromFile(req.file);

    console.log("📄 Resume Text:");
    console.log(resumeText.substring(0, 1000));

    // delete file after extraction
    fs.unlinkSync(req.file.path);

    /* ---------------- Create Application ---------------- */
    const application = await JobApplication.create({
      jobId,
      jobSeekerId: jobSeeker._id,
      status: "applied",
    });

    return res.status(201).json({
      message: "Application submitted successfully",
      applicationId: application._id,
    });

  } catch (error) {
    console.error("Apply to job error:", error);

    if (req.file?.path) fs.unlinkSync(req.file.path);

    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};
