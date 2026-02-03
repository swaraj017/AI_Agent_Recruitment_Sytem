import { Router } from "express";
import { applyToJob } from "../controllers/jobApplication.js";
import { protect } from "../middleware/auth.js";

const router = Router();

/**
 * Apply to a job
 * POST /api/applications/apply
 */
router.post("/apply", protect, applyToJob);

export default router;
