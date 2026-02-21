import HR from "../models/HR.js";
import JOB from "../models/Job.js";

/**
 * @desc Post a new job
 */
export const postJob = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      jobType,
      experience,
      salaryMin,
      salaryMax,
      salaryCurrency,
      description,
      requirements,
      responsibilities,
      benefits,
      deadline,
    } = req.body;

    const hr = await HR.findOne({ authUserId: req.user._id });
    if (!hr) {
      return res.status(404).json({ message: "HR profile not found" });
    }

    if (!title || !company || !location || !jobType || !description) {
      return res.status(400).json({
        message: "Required fields missing",
      });
    }

    const job = await JOB.create({
      hrId: hr._id,
      title,
      company,
      location,
      jobType,
      experience,
      salary: {
        min: salaryMin,
        max: salaryMax,
        currency: salaryCurrency || "PLN",
      },
      description,
      requirements,
      responsibilities,
      benefits,
      deadline,
    });

    res.status(201).json({
      message: "Job posted successfully",
      job,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to post job" });
  }
};

/**
 * @desc Get jobs created by logged-in HR
 */
export const getMyJobs = async (req, res) => {
  try {
    const hr = await HR.findOne({ authUserId: req.user._id });

    if (!hr) {
      return res.status(404).json({ message: "HR profile not found" });
    }

    const jobs = await JOB.find({ hrId: hr._id }).sort({ createdAt: -1 });

    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};