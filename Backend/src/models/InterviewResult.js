import mongoose from "mongoose";

const interviewResultSchema = new mongoose.Schema(
  {
    jobApplicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobApplication",
      required: true,
      unique: true,
    },

    atsProfileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ATSProfile",
      required: true,
    },

    interviewScore: {
      type: Number, // 0 - 100
    },

    strengths: [String],
    weaknesses: [String],

    recommendation: {
      type: String,
      enum: ["hire", "maybe", "reject"],
    },

    conductedBy: {
      type: String,
      default: "ai-agent",
    },
  },
  { timestamps: true }
);

export default mongoose.model("InterviewResult", interviewResultSchema);
