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
      className={`transition-colors ${
        isSelected ? "ring-1 ring-foreground border-foreground/20" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-foreground">{title}</h3>
            <Badge variant={statusVariants[status] || "default"} className="capitalize">
              {status}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {location} · {type} · {salary}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center gap-4 text-center">
          <div>
            <p className="text-lg font-semibold text-foreground">{stats.total || 0}</p>
            <p className="text-xs text-muted-foreground">Total</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-foreground">{stats.shortlisted || 0}</p>
            <p className="text-xs text-muted-foreground">Shortlisted</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
        <p className="text-xs text-muted-foreground">Posted {postedAt}</p>
        <p className="text-xs text-muted-foreground">
          Deadline: <span className="text-foreground">{deadline}</span>
        </p>
      </div>
    </Card>
  );
};

export default HRJobCard;
