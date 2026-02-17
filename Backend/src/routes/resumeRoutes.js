import express from "express";
import multer from "multer";
import { uploadAndParseController, rankResumesController } from "../controllers/resumeController.js";

const router = express.Router();

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post("/upload", upload.single("resume"), uploadAndParseController);
router.post("/rank", rankResumesController);

export default router;
