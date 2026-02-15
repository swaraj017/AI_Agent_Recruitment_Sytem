import JobApplication from "../models/JobApplication.js";
import JobSeeker from "../models/JobSeeker.js";

/**
 * Job seeker applies to a job
 */
export const applyToJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    if (!jobId) {
      return res.status(400).json({ message: "Job id is required" });
    }

    // get job seeker profile from logged-in user
    const jobSeeker = await JobSeeker.findOne({
      authUserId: req.user._id,
    });

    if (!jobSeeker) {
      return res.status(404).json({ message: "Job seeker profile not found" });
    }

    // prevent duplicate applications
    const existingApplication = await JobApplication.findOne({
      jobId,
      jobSeekerId: jobSeeker._id,
    });

    if (existingApplication) {
      return res.status(409).json({ message: "You already applied to this job" });
    }

    // create application
    const application = await JobApplication.create({
      jobId,
      jobSeekerId: jobSeeker._id,
    });

    res.status(201).json({
      message: "Application submitted successfully",
      applicationId: application._id,
    });
  } catch (error) {
    console.error("Apply to job error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
