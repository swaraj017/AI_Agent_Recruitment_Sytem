import mongoose from "mongoose";

const hrSchema = new mongoose.Schema(
  {
    authUserId: { type: mongoose.Schema.Types.ObjectId, ref: "AuthUser", required: true, unique: true },
    companyName: { type: String, required: true, trim: true },
    companyWebsite: { type: String, trim: true },
    companyLocation: { type: String, trim: true },
    industryType: { type: String, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model("HR", hrSchema);
