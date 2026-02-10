import express from "express";
import { rankResumesController } from "../controllers/resumeController.js";

const router = express.Router();

router.post("/rank", rankResumesController);

export default router;
