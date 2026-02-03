import { Router } from "express";
import { postJob, getMyJobs } from "../controllers/hr.js";
import { protect, hrOnly } from "../middleware/auth.js";

const router = Router();

router.post("/jobs", protect, hrOnly, postJob);
router.get("/jobs", protect, hrOnly, getMyJobs);

export default router;
