import express from "express";
import multer from "multer";
import { uploadAndParseController, rankResumesController } from "../controllers/resumeController.js";

const router = express.Router();

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 5 * 1024 * 1024 },
});
// introduce a new endpoint called a /application in which except a formm data like 
/* {
form data {
 resume: null,   => resume file 
    coverLetter: "",
    linkedIn: "",
    portfolio: "",
    experience: "",
    expectedSalary: "",
    noticePeriod: "",
    whyJoin: "",
}

step 1 => parse the resme data by functions 
step 2 => after everything then store the entire data in db 
  */ 
router.post("/upload", upload.single("resume"), uploadAndParseController);
router.post("/rank", rankResumesController);

export default router;
