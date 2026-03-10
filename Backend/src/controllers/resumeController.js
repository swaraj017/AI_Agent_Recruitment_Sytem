import fs from "fs";
import mammoth from "mammoth";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { rankResumes } from "../ai-model/ranking/rankResumes.js";
import ParsedResume from "../models/ParsedResume.js";
import ATSProfile from "../models/ATSProfile.js";
import JobApplication from "../models/JobApplication.js";


/* ------------------ Helpers ------------------ */
const extractTextFromPDFBuffer = async (buffer) => {
  const data = new Uint8Array(buffer);
  const pdf = await pdfjsLib.getDocument({ data }).promise;

  let text = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((item) => item.str).join(" ");
  }
  return text;
};

export const extractTextFromFile = async (file) => {
  if (file.mimetype === "application/pdf") {
    // memoryStorage: file.buffer is present
    const buf = file.buffer || (file.path ? fs.readFileSync(file.path) : null);
    if (!buf) throw new Error("No file buffer provided");
    return await extractTextFromPDFBuffer(buf);
  }
  if (
    file.mimetype ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    // mammoth supports buffer via binary input API
    const arrayBuffer = file.buffer || (file.path ? fs.readFileSync(file.path) : null);
    if (!arrayBuffer) throw new Error("No file buffer provided");
    const data = await mammoth.extractRawText({ buffer: arrayBuffer });
    return data.value;
  }
  if (file.mimetype === "text/plain") {
    const buf = file.buffer || (file.path ? fs.readFileSync(file.path) : null);
    if (!buf) throw new Error("No file buffer provided");
    return buf.toString("utf8");
  }
  throw new Error("Unsupported file type");
};


// /* ------------------ Upload Controller ------------------ */
// export const uploadAndParseController = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }
    
//     const text = await extractTextFromFile(req.file);
//     if (req.file?.path) {
//       try { fs.unlinkSync(req.file.path); } catch {}
//     }

//     return res.json({
//       message: "Resume parsed successfully",
//       text,
//     });
//   } catch (err) {
//     if (req.file?.path) { try { fs.unlinkSync(req.file.path); } catch {} }
//     return res.status(500).json({
//       error: "Parsing failed",
//       details: err.message,
//     });
//   }
// };

// /* ------------------ Ranking + ATS Controller ------------------ */
// const FIT_THRESHOLD = 65;

// export const rankResumesController = async (req, res) => {
//   try {
//     const { resumes, jobDescription, jobId } = req.body;

//     if (!resumes || !jobDescription || !jobId) {
//       return res.status(400).json({
//         error: "Missing resumes, jobDescription, or jobId",
//       });
//     }

//     const ranked = await rankResumes(resumes, jobDescription);

//     const results = [];

//     for (let i = 0; i < ranked.length; i++) {
//       const item = ranked[i];
//       const isFit = item.score >= FIT_THRESHOLD;

//       results.push({
//         jobApplicationId: item.jobApplicationId,
//         jobSeekerId: item.jobSeekerId,
//         score: item.score,
//         isFit: isFit,
//       });
//     }

//     // Console output
//     console.log("Ranking Results:");
//     for (let i = 0; i < results.length; i++) {
//       console.log(
//         "Application:",
//         results[i].jobApplicationId,
//         "| Score:",
//         results[i].score,
//         "| Fit:",
//         results[i].isFit
//       );
//     }

//     return res.json({
//       message: "Ranking completed",
//       results: results,
//     });

//   } catch (error) {
//     console.error("Ranking error:", error);
//     return res.status(500).json({
//       error: "Ranking failed",
//       details: error.message,
//     });
//   }
// };
