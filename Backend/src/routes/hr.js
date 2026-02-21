import { Router } from "express";
import { postJob, getMyJobs } from "../controllers/hr.js";
import { protect, hrOnly } from "../middleware/auth.js";

const router = Router();

/**
 * ============================================
 * POST /api/hr/Postjobs
 * ============================================
 * Description: Create a new job (HR only)
 *
 * Headers:
 *   Authorization: Bearer <JWT_TOKEN>
 *   Content-Type: application/json
 *
 * Body (JSON):
 * {
 *   "title": "Backend Developer",              // string (required)
 *   "description": "Job description here",     // string (required)
 *   "location": "New York",                    // string (optional)
 *   "jobType": "full-time",                    // string (required)
 *   // allowed values: full-time | part-time | internship | contract
 *   "salaryRange": "$4000 - $6000",            // string (optional)
 *   "deadline": "2026-03-30"                   // date (optional, ISO format)
 * }
 *
 * Success Response: 201
 * {
 *   "success": true,
 *   "job": { ...jobObject }
 * }
 */
router.post("/Postjobs", protect, hrOnly, postJob);


/**
 * ============================================
 * GET /api/hr/jobs
 * ============================================
 * Description: Get all jobs posted by logged-in HR
 *
 * Headers:
 *   Authorization: Bearer <JWT_TOKEN>
 *
 * Success Response: 200
 * {
 *   "success": true,
 *   "jobs": [ ... ]
 * }
 */
router.get("/jobs", protect, hrOnly, getMyJobs);

export default router;