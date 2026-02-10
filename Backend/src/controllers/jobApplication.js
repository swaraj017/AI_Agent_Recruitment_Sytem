import JobApplication from "../models/JobApplication.js";
import Job from "../models/job.js";

// Apply to a job
export const applyToJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const userId = req.user.id; // From auth middleware

    // Validate job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if already applied
    const existingApplication = await JobApplication.findOne({
      jobId,
      userId,
    });
    if (existingApplication) {
      return res.status(400).json({ message: "Already applied to this job" });
    }

    // Create application
    const application = new JobApplication({
      jobId,
      userId,
      appliedAt: new Date(),
      status: "pending",
    });

    await application.save();

    res.status(201).json({
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    console.error("Error applying to job:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
