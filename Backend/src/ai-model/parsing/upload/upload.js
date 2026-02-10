import express from "express";
import multer from "multer";
import fs from "fs";
import mammoth from "mammoth";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

const router = express.Router();

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 5 * 1024 * 1024 },
});

/* -------------------- PDF TEXT EXTRACT -------------------- */
const extractTextFromPDF = async (filePath) => {
  const data = new Uint8Array(fs.readFileSync(filePath));
  const pdf = await pdfjsLib.getDocument({ data }).promise;

  let text = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((item) => item.str).join(" ");
  }

  return text;
};

/* -------------------- MAIN TEXT EXTRACT -------------------- */
const extractTextFromFile = async (file) => {
  if (file.mimetype === "application/pdf") {
    return await extractTextFromPDF(file.path);
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

/* -------------------- BASIC PARSER -------------------- */
const basicParse = (text) => {
  const email =
    text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)?.[0] ||
    "Not found";

  const phone =
    text.match(/(\+?\d{1,3}[- ]?)?\d{10}/)?.[0] || "Not found";

  const name =
    text.split("\n").find((l) => l.trim().length > 2)?.trim() || "Not found";

  return { name, email, phone };
};

/* -------------------- ROUTE -------------------- */
router.post("/upload-resume", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const text = await extractTextFromFile(req.file);
    const parsedData = basicParse(text);

    fs.unlinkSync(req.file.path);

    res.json({
      message: "Resume parsed successfully",
      parsedData,
    });
  } catch (err) {
    if (req.file?.path) fs.unlinkSync(req.file.path);

    res.status(500).json({
      error: "Resume parsing failed",
      details: err.message,
    });
  }
});

export default router;
