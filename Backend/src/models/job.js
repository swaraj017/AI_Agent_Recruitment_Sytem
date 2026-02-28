import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    hrId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HR",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      trim: true,
      required: true,
    },

    location: {
      type: String,
      trim: true,
      required: true,
    },

    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Internship", "Contract"],
      required: true,
    },

    experience: {
      type: String,
      enum: ["Entry Level", "Mid Level", "Senior Level"],
      default: "Mid Level",
    },

    salary: {
      min: Number,
      max: Number,
      currency: {
        type: String,
        default: "PLN",
      },
    },

    description: {
      type: String,
      required: true,
    },

    requirements: String,
    responsibilities: String,
    benefits: String,
    deadline: Date,
  },
  { timestamps: true }
);

 
const JOB = mongoose.models.JOB || mongoose.model("JOB", jobSchema);

export default JOB;