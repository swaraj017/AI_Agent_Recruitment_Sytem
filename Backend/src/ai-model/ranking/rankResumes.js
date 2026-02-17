import natural from "natural";

const tokenizer = new natural.WordTokenizer();

/* ------------ Clean Text ------------ */
const preprocess = (text) => {
  return tokenizer
    .tokenize(text.toLowerCase())
    .filter((word) => word.length > 2)
    .join(" ");
};

/* ------------ Cosine Similarity ------------ */
const cosineSimilarity = (vecA, vecB) => {
  const dot = vecA.reduce((sum, val, i) => sum + val * vecB[i], 0);
  const magA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));

  if (magA === 0 || magB === 0) return 0;

  return dot / (magA * magB);
};

/* ------------ Ranking Logic ------------ */
export const rankResumes = (resumes, jobDescription) => {
  const tfidf = new natural.TfIdf();

  const cleanJD = preprocess(jobDescription);
  tfidf.addDocument(cleanJD);

  resumes.forEach((resume) => {
    const cleanResume = preprocess(resume.text);
    tfidf.addDocument(cleanResume);
  });

  const ranked = resumes.map((resume, index) => {
    const jobVector = [];
    const resumeVector = [];

    tfidf.listTerms(0).forEach((term) => {
      jobVector.push(term.tfidf);
      resumeVector.push(tfidf.tfidf(term.term, index + 1));
    });

    const similarity = cosineSimilarity(jobVector, resumeVector);

    return {
      ...resume,
      score: Math.round(similarity * 100),
    };
  });

  return ranked.sort((a, b) => b.score - a.score);
};
