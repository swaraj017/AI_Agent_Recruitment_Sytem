import React from "react";
import { Card, Badge, Button } from "../common";

const CandidateCard = ({ candidate, onViewProfile, onShortlist, onReject }) => {
  const {
    name,
    email,
    appliedAt,
    status,
    atsScore,
    matchedSkills = [],
    experience,
    education,
    resumeUrl,
  } = candidate;

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600 bg-green-50";
    if (score >= 60) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const statusVariants = {
    pending: "warning",
    reviewed: "info",
    shortlisted: "success",
    rejected: "danger",
    interviewed: "primary",
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
          <span className="text-secondary font-semibold text-lg">
            {name?.charAt(0)?.toUpperCase()}
          </span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-gray-900">{name}</h4>
            <Badge
              variant={statusVariants[status]}
              className="capitalize text-[10px]"
            >
              {status}
            </Badge>
          </div>
          <p className="text-sm text-gray-500 mb-2">{email}</p>

          {/* Skills */}
          <div className="flex flex-wrap gap-1 mb-2">
            {matchedSkills.slice(0, 4).map((skill, index) => (
              <Badge key={index} variant="outline" className="text-[10px]">
                {skill}
              </Badge>
            ))}
            {matchedSkills.length > 4 && (
              <Badge variant="outline" className="text-[10px]">
                +{matchedSkills.length - 4} more
              </Badge>
            )}
          </div>

          <p className="text-xs text-gray-400">
            {experience} exp • {education} • Applied {appliedAt}
          </p>
        </div>

        {/* ATS Score */}
        <div className={`px-3 py-2 rounded-xl ${getScoreColor(atsScore)}`}>
          <p className="text-2xl font-bold">{atsScore}%</p>
          <p className="text-[10px] uppercase tracking-wide">Match</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
        <Button
          size="sm"
          variant="outline"
          onClick={onViewProfile}
          className="flex-1"
        >
          View Profile
        </Button>
        {status === "pending" || status === "reviewed" ? (
          <>
            <Button size="sm" onClick={onShortlist} className="flex-1">
              Shortlist
            </Button>
            <Button size="sm" variant="ghost" onClick={onReject}>
              <svg
                className="w-4 h-4 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>
          </>
        ) : null}
      </div>
    </Card>
  );
};

export default CandidateCard;
