import mongoose from "mongoose";

const interviewSessionSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    jobApplicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobApplication",
      required: true,
    },

    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    jobSeekerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobSeeker",
      required: true,
    },

    parsedResumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ParsedResume",
      required: true,
    },

    interviewLink: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "completed", "expired"],
      default: "active",
    }
  },
  { timestamps: true }
);

export default mongoose.model("InterviewSession", interviewSessionSchema);