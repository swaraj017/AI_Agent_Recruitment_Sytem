import { pipeline } from "@xenova/transformers";

let embedder;

/* ------------ Load Model Once ------------ */
const loadModel = async () => {
  if (!embedder) {
    console.log("Loading embedding model...");
    embedder = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    );
    console.log("Model loaded.");
  }
  return embedder;
};

/* ------------ Cosine Similarity ------------ */
const cosineSimilarity = (a, b) => {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  if (magA === 0 || magB === 0) return 0;
  return dot / (magA * magB);
};

/* ------------ Extract Required Skills from JD ------------ */
const extractSkills = (jobDescription) => {
  const commonSkills = [
    "react",
    "node",
    "mongodb",
    "express",
    "rest",
    "javascript",
    "mern"
  ];

  const jd = jobDescription.toLowerCase();

  return commonSkills.filter(skill => jd.includes(skill));
};

/* ------------ Experience Score ------------ */
const calculateExperienceScore = (resumeText) => {
  const text = resumeText.toLowerCase();

  let score = 0;

  if (text.includes("intern")) score += 0.2;
  if (text.includes("project")) score += 0.2;
  if (text.includes("experience")) score += 0.3;
  if (text.includes("worked")) score += 0.3;

  return Math.min(score, 1); 
};

/* ------------ Main Ranking Function ------------ */
export const rankResumes = async (resumes, jobDescription) => {
  const model = await loadModel();

  const jdEmbedding = await model(jobDescription, {
    pooling: "mean",
    normalize: true,
  });

  const jdVector = jdEmbedding.data;

  const requiredSkills = extractSkills(jobDescription);

  const results = [];

  for (const resume of resumes) {
    const resumeEmbedding = await model(resume.text, {
      pooling: "mean",
      normalize: true,
    });

    const resumeVector = resumeEmbedding.data;

    const similarity = cosineSimilarity(jdVector, resumeVector);

    // -------- Skill Match Score --------
    const resumeText = resume.text.toLowerCase();
    let matchedSkills = 0;

    requiredSkills.forEach(skill => {
      if (resumeText.includes(skill)) {
        matchedSkills++;
      }
    });

    const skillScore =
      requiredSkills.length > 0
        ? matchedSkills / requiredSkills.length
        : 0;

    // -------- Experience Score --------
    const experienceScore = calculateExperienceScore(resume.text);

    // -------- Final Weighted Score --------
    const finalScore =
      similarity * 0.5 +   // 50% semantic
      skillScore * 0.3 +   // 30% skills
      experienceScore * 0.2; // 20% experience

    const score = Math.round(finalScore * 100);

    results.push({
      ...resume,
      score,
      similarity: similarity.toFixed(2),
      skillMatch: skillScore.toFixed(2),
      experienceScore: experienceScore.toFixed(2),
    });
  }

  return results.sort((a, b) => b.score - a.score);
};
