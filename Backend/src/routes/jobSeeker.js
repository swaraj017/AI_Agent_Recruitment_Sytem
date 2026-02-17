
import { protect } from "../middleware/auth.js";
 

import express from "express";
import multer from "multer";
import { applyToJob } from "../controllers/jobSeeker.js";

const router = express.Router();

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

router.post("/apply", protect, upload.single("resume"), applyToJob);

export default router;
