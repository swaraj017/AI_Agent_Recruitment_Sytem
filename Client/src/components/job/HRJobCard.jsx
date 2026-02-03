import React from "react";
import { Card, Badge } from "../common";

const HRJobCard = ({ job, onClick, isSelected }) => {
  const {
    title,
    location,
    type,
    salary,
    postedAt,
    deadline,
    status,
    stats = {},
  } = job;

  const statusVariants = {
    active: "success",
    closed: "default",
    draft: "warning",
  };

  return (
    <Card
      hover
      className={`transition-all ${
        isSelected ? "ring-2 ring-secondary border-secondary" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <Badge variant={statusVariants[status] || "default"} className="capitalize">
              {status}
            </Badge>
          </div>
          <p className="text-sm text-gray-500 flex items-center gap-3">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {location}
            </span>
            <span>•</span>
            <span>{type}</span>
            <span>•</span>
            <span>{salary}</span>
          </p>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center gap-4 text-center">
          <div>
            <p className="text-xl font-bold text-gray-900">{stats.total || 0}</p>
            <p className="text-xs text-gray-500">Applications</p>
          </div>
          <div>
            <p className="text-xl font-bold text-secondary">{stats.shortlisted || 0}</p>
            <p className="text-xs text-gray-500">Shortlisted</p>
          </div>
          <div>
            <p className="text-xl font-bold text-green-600">{stats.interviewed || 0}</p>
            <p className="text-xs text-gray-500">Interviewed</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-400">Posted {postedAt}</p>
        <p className="text-xs text-gray-400">
          Deadline: <span className="text-gray-600 font-medium">{deadline}</span>
        </p>
      </div>
    </Card>
  );
};

export default HRJobCard;
