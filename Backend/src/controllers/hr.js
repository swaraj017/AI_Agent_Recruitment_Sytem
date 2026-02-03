import HR from "../models/HR.js";
import Job from "../models/job.js";

export const postJob = async (req, res) => {
  try {
    const { title, description, location, jobType, salaryRange, deadline } = req.body;

    // Find HR profile using auth user id
    const hr = await HR.findOne({ authUserId: req.user._id });
    if (!hr) return res.status(404).json({ message: "HR profile not found" });

    const job = await Job.create({
      hrId: hr._id,
      title,
      description,
      location,
      jobType,
      salaryRange,
      deadline,
    });

    res.status(201).json({
      message: "Job posted successfully",
      job,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to post job" });
  }
};

export const getMyJobs = async (req, res) => {
  try {
    const hr = await HR.findOne({ authUserId: req.user._id });
    const jobs = await Job.find({ hrId: hr._id }).sort({ createdAt: -1 });

    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};
