import React from "react";

const StatsCard = ({ label, value, change, changeType = "neutral" }) => {
  const changeColors = {
    positive: "text-emerald-600",
    negative: "text-red-600",
    neutral: "text-muted-foreground",
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-muted-foreground">{label}</p>
        {change && (
          <span className={`text-xs font-medium ${changeColors[changeType]}`}>
            {change}
          </span>
        )}
      </div>
      <p className="text-2xl font-semibold text-foreground">{value}</p>
    </div>
  );
};

export default StatsCard;
