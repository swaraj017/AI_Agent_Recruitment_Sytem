import mongoose from "mongoose";

const atsProfileSchema = new mongoose.Schema(
  {
    jobApplicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobApplication",
      required: true,
      unique: true,
      index: true,
    },

    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
      index: true,
    },

    jobSeekerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobSeeker",
      required: true,
      index: true,
    },

    // --- ATS DECISION ---
    atsScore: {
      type: Number, // 0–100
      required: true,
      index: true,
    },

    isFit: {
      type: Boolean,
      required: true,
      index: true,
    },

    // --- CORE SIGNALS ---
    skills: {
      type: [String],
      index: true,
    },

    experienceYears: Number,

    educationLevel: String, // bachelor | master | phd | other

    matchedKeywords: [String],
    missingKeywords: [String],

    // --- HIGH-LEVEL SUMMARY ---
    summary: {
      type: String,
      maxlength: 1000, // short, model-ready
    },
    parsedResumeId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "ParsedResume",
},


    // --- TRACEABILITY ---
    parsedBy: {
      type: String,
      required: true,
    },

    parsedAt: {
      type: Date,
      default: Date.now,
    },

  },
  { timestamps: true }
);

export default mongoose.model("ATSProfile", atsProfileSchema);
