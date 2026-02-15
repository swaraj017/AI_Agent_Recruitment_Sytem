import mongoose from "mongoose";

const authUserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["hr", "job_seeker"], required: true },
  },
  { timestamps: true }
);

export default mongoose.model("AuthUser", authUserSchema);
