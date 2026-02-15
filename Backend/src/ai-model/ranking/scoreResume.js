const REQUIRED_SKILLS = [
  "react",
  "node",
  "javascript",
  "mongodb",
  "typescript",
  "express",
  "next.js",
];

export const scoreResume = (resumeText, jobDescription) => {
  const text = resumeText.toLowerCase();
  const jd = jobDescription.toLowerCase();

  let score = 0;

  // Skills – 40
  let matched = REQUIRED_SKILLS.filter(
    (skill) => text.includes(skill) && jd.includes(skill)
  ).length;

  score += (matched / REQUIRED_SKILLS.length) * 40;

  // Experience – 30
  const expKeywords = [
    "intern",
    "developer",
    "engineer",
    "experience",
    "project",
    "full-stack",
  ];

  let expMatches = expKeywords.filter((k) => text.includes(k)).length;
  score += Math.min((expMatches / expKeywords.length) * 30, 30);

  // Education – 20
  if (
    text.includes("engineering") ||
    text.includes("computer science") ||
    text.includes("artificial intelligence")
  ) {  
    score += 20;
  }

  // Extras – 10
  const extras = ["nasa", "hackathon", "ai", "saas"];
  let extraHits = extras.filter((k) => text.includes(k)).length;
  score += Math.min(extraHits * 2.5, 10);

  return Math.round(score);
};
