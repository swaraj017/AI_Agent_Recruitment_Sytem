import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    jobApplicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobApplication",
      required: true,
      unique: true,
    },

    jobSeekerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobSeeker",
      required: true,
    },

    fileUrl: {
      type: String,
      required: true, // S3 / Cloudinary
    },

    parsingStatus: {
      type: String,
      enum: ["pending", "parsed", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Resume", resumeSchema);
