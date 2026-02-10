import { scoreResume } from "./scoreResume.js";

export const rankResumes = (resumes, jobDescription) => {
  return resumes
    .map((resume) => ({
      ...resume,
      score: scoreResume(resume.text, jobDescription),
    }))
    .sort((a, b) => b.score - a.score);
};
