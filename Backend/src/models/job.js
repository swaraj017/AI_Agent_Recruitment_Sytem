import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    hrId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HR",
      required: true,
    },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    location: { type: String, trim: true },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "internship", "contract"],
      required: true,
    },
    salaryRange: { type: String },
    deadline: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.Job || mongoose.model("Job", jobSchema);