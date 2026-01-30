import mongoose from "mongoose";

const jobSeekerSchema = new mongoose.Schema(
  {
    authUserId: { type: mongoose.Schema.Types.ObjectId, ref: "AuthUser", required: true, unique: true },
    fullName: { type: String, required: true, trim: true },
    country: { type: String, trim: true },
    city: { type: String, trim: true },
    phoneNumber: { type: String, trim: true },
    dateOfBirth: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("JobSeeker", jobSeekerSchema);
