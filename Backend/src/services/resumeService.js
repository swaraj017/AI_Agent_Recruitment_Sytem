import { rankResumes } from "../ai-model/ranking/rankResumes.js";

export const rankUploadedResumes = (resumes, jobDescription) => {
  return rankResumes(resumes, jobDescription);
};
