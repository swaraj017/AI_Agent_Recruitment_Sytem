import express from "express";
import multer from "multer";
import { protect } from "../middleware/auth.js";
import { applyToJob ,GetAllJobs,jobDetails} from "../controllers/jobSeeker.js";

const router = express.Router();

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.get("/jobs",protect,GetAllJobs);
router.get("/jobs/:id", protect, jobDetails);
router.post("/apply", protect, upload.single("resume"), applyToJob);

export default router;