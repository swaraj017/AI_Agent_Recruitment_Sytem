import React from "react";

const StatsCard = ({ icon, label, value, change, changeType = "neutral" }) => {
  const changeColors = {
    positive: "text-green-600 bg-green-50",
    negative: "text-red-600 bg-red-50",
    neutral: "text-gray-600 bg-gray-50",
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
          {icon}
        </div>
        {change && (
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${changeColors[changeType]}`}>
            {changeType === "positive" ? "+" : ""}{change}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-gray-900 mt-4">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
};

export default StatsCard;
