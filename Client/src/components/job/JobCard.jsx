import React, { useState } from "react";
import { Card, Badge } from "../common";

const JobCard = ({ job, onClick }) => {
  const [saved, setSaved] = useState(false);

  const {
    title,
    company,
    companyLogo,
    location,
    salary,
    tags = [],
    postedAt,
    type,
  } = job;

  // Generate a placeholder color based on company name
  const getLogoColor = (name) => {
    const colors = [
      "bg-blue-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-green-500",
      "bg-orange-500",
    ];
    const index = name?.charCodeAt(0) % colors.length || 0;
    return colors[index];
  };

  const getTagVariant = (tag) => {
    const variants = {
      Remote: "primary",
      "Full-time": "success",
      "Part-time": "warning",
      Contract: "info",
      Internship: "default",
    };
    return variants[tag] || "outline";
  };

  return (
    <Card hover className="group" onClick={onClick}>
      <div className="flex items-start justify-between">
        {/* Left side */}
        <div className="flex gap-4">
          {/* Company Logo */}
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0 ${
              companyLogo ? "" : getLogoColor(company)
            }`}
          >
            {companyLogo ? (
              <img
                src={companyLogo}
                alt={company}
                className="w-full h-full object-contain rounded-xl"
              />
            ) : (
              company?.charAt(0)?.toUpperCase()
            )}
          </div>

          {/* Job Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-gray-900 group-hover:text-secondary transition-colors">
                {title}
              </h3>
              {tags.map((tag, index) => (
                <Badge key={index} variant={getTagVariant(tag)} className="text-[10px]">
                  {tag}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
              <span className="font-medium text-gray-700">{company}</span>
              <span className="text-gray-300">—</span>
              <span>{location}</span>
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex flex-col items-end gap-2 flex-shrink-0 ml-4">
          <p className="font-semibold text-gray-900">{salary}</p>
          <p className="text-xs text-gray-400">{postedAt}</p>
        </div>
      </div>

      {/* Save Button - appears on hover */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setSaved(!saved);
        }}
        className={`absolute top-4 right-4 p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 ${
          saved
            ? "bg-secondary/10 text-secondary"
            : "bg-gray-100 text-gray-400 hover:bg-gray-200"
        }`}
      >
        <svg
          className="w-4 h-4"
          fill={saved ? "currentColor" : "none"}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
          />
        </svg>
      </button>
    </Card>
  );
};

export default JobCard;
