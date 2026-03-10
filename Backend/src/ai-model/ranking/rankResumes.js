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

/* ------------ Normalize Skill ------------ */
const normalize = (s) => s.toLowerCase().replace(".js", "").trim();

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

/* ------------ Skill Matching (Structured) ------------ */
const calculateSkillScore = (jobSkills, resumeSkills) => {

  if (!jobSkills || jobSkills.length === 0) return 0;

  const normalizedResume = resumeSkills.map(normalize);
  const normalizedJob = jobSkills.map(normalize);

  let matched = 0;

  normalizedJob.forEach((skill) => {
    const found = normalizedResume.find((r) => r.includes(skill));
    if (found) matched++;
  });

  return matched / normalizedJob.length;
};

/* ------------ Main Ranking Function ------------ */
export const rankResumes = async (
  resumes,
  jobDescription,
  jobSkills = []
) => {

  const model = await loadModel();

  /* ---------- Embed Job Description ---------- */
  const jdEmbedding = await model(jobDescription, {
    pooling: "mean",
    normalize: true,
  });

  const jdVector = jdEmbedding.data;

  const results = [];

  for (const resume of resumes) {

    /* ---------- Resume Embedding ---------- */
    const resumeEmbedding = await model(resume.text, {
      pooling: "mean",
      normalize: true,
    });

    const resumeVector = resumeEmbedding.data;

    /* ---------- Semantic Similarity ---------- */
    const similarity = cosineSimilarity(jdVector, resumeVector);

    /* ---------- Structured Skill Matching ---------- */
    const skillScore = calculateSkillScore(
      jobSkills,
      resume.skills || []
    );

    /* ---------- Experience Score ---------- */
    const experienceScore = calculateExperienceScore(resume.text);

    /* ---------- Final Score ---------- */
    const finalScore =
      similarity * 0.4 +
      skillScore * 0.4 +
      experienceScore * 0.2;

    const score = Math.round(finalScore * 100);

    console.log("----- Candidate Score -----");
    console.log("Similarity:", similarity);
    console.log("Skill Score:", skillScore);
    console.log("Experience Score:", experienceScore);
    console.log("Final Score:", score);

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