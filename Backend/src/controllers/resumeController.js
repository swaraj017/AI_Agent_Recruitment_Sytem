export const rankResumesController = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "Request body is missing" });
  }

  const { resumes, jobDescription } = req.body;

  if (!resumes || !jobDescription) {
    return res.status(400).json({
      error: "resumes or jobDescription missing",
    });
  }

  const ranked = rankUploadedResumes(resumes, jobDescription);

  res.json({
    message: "Resumes ranked successfully",
    rankedResumes: ranked,
  });
};
