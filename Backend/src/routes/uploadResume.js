import express from "express";
import multer from "multer";
import fs from "fs";
import mammoth from "mammoth";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

const router = express.Router();

/* -------------------- Multer Config -------------------- */
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

/* -------------------- Helper Functions -------------------- */
const extractTextFromFile = async (file) => {
  if (file.mimetype === "application/pdf") {
    const buffer = fs.readFileSync(file.path);
    const data = await pdfParse(buffer);
    return data.text;
  }

  if (
    file.mimetype ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const data = await mammoth.extractRawText({ path: file.path });
    return data.value;
  }

  throw new Error("Unsupported file type");
};

const basicParse = (text) => {
  const email =
    text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)?.[0] ||
    "Not found";

  const phone =
    text.match(/(\+?\d{1,3}[- ]?)?\d{10}/)?.[0] || "Not found";

  const name =
    text.split("\n").find((line) => line.trim().length > 2)?.trim() ||
    "Not found";

  return {
    name,
    email,
    phone,
    rawTextLength: text.length,
  };
};

/* -------------------- Route -------------------- */
router.post(
  "/upload-resume",
  upload.single("resume"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const text = await extractTextFromFile(req.file);
      const parsedData = basicParse(text);

      // cleanup
      fs.unlinkSync(req.file.path);

      return res.json({
        message: "Resume parsed successfully",
        parsedData,
        rawTextPreview: text.slice(0, 500), // helpful for debugging
      });
    } catch (error) {
      console.error(error);

      if (req.file?.path) fs.unlinkSync(req.file.path);

      return res.status(500).json({
        error: "Resume parsing failed",
        details: error.message,
      });
    }
  },
);

export default router;
