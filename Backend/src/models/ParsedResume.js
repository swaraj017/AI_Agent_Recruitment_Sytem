import mongoose from "mongoose";

const parsedResumeSchema = new mongoose.Schema(
  {
    jobApplicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobApplication",
      required: true,
      unique: true,
      index: true,
    },

    jobSeekerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobSeeker",
      required: true,
      index: true,
    },

    extractedSkills: [String],

    experienceYears: Number,

    educationLevel: {
      type: String,
      enum: ["bachelor", "master", "phd", "other"],
    },

    rawTextLength: Number,

    parserVersion: {
      type: String,
      default: "ai-parser-v1",
    },
  },
  { timestamps: true }
);

export default mongoose.model("ParsedResume", parsedResumeSchema);
