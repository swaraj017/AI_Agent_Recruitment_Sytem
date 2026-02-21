import express from "express";
import multer from "multer";
import { protect } from "../middleware/auth.js";
import { applyToJob } from "../controllers/jobSeeker.js";

const router = express.Router();

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 5 * 1024 * 1024 },
});

/**
 * ============================================
 * POST /api/applications/apply
 * ============================================
 * Description: Apply to a job (Job Seeker only)
 *
 * Headers:
 *   Authorization: Bearer <JWT_TOKEN>
 *   Content-Type: multipart/form-data
 *
 * Form-Data:
 *   jobId      -> string (required)  // MongoDB ObjectId of job
 *   resume     -> file (required)    // PDF or DOCX only, max 5MB
 *
 * Example (Frontend FormData):
 *   formData.append("jobId", "65abc123...");
 *   formData.append("resume", selectedFile);
 *
 * Success Response: 201
 * {
 *   "success": true,
 *   "message": "Application submitted successfully",
 *   "applicationId": "65def456..."
 * }
 *
 * Error Cases:
 *   400 -> Missing jobId or resume
 *   404 -> Job not found
 *   409 -> Already applied
 */
router.post("/apply", protect, upload.single("resume"), applyToJob);

export default router;