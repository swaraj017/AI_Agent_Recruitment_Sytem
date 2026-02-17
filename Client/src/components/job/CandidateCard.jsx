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
    if (score >= 80) return "text-emerald-700 bg-emerald-50 border-emerald-200";
    if (score >= 60) return "text-amber-700 bg-amber-50 border-amber-200";
    return "text-red-700 bg-red-50 border-red-200";
  };

  const statusVariants = {
    pending: "warning",
    reviewed: "info",
    shortlisted: "success",
    rejected: "danger",
    interviewed: "primary",
  };

  return (
    <Card>
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="w-9 h-9 rounded-md bg-foreground flex items-center justify-center flex-shrink-0">
          <span className="text-background font-medium text-sm">
            {name?.charAt(0)?.toUpperCase()}
          </span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h4 className="font-medium text-foreground text-sm">{name}</h4>
            <Badge
              variant={statusVariants[status]}
              className="capitalize"
            >
              {status}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mb-2">{email}</p>

          {/* Skills */}
          <div className="flex flex-wrap gap-1 mb-2">
            {matchedSkills.slice(0, 3).map((skill, index) => (
              <Badge key={index} variant="outline" className="text-[10px]">
                {skill}
              </Badge>
            ))}
            {matchedSkills.length > 3 && (
              <Badge variant="outline" className="text-[10px]">
                +{matchedSkills.length - 3}
              </Badge>
            )}
          </div>

          <p className="text-xs text-muted-foreground">
            {experience} · {education}
          </p>
        </div>

        {/* ATS Score */}
        <div className={`px-2.5 py-1.5 rounded-md border ${getScoreColor(atsScore)}`}>
          <p className="text-lg font-semibold">{atsScore}%</p>
          <p className="text-[10px] uppercase tracking-wide">Match</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
        <Button
          size="sm"
          variant="outline"
          onClick={onViewProfile}
          className="flex-1"
        >
          Profile
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
