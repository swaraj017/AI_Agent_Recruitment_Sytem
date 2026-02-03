import React from "react";

const sizes = {
  sm: "h-4 w-4",
  md: "h-8 w-8",
  lg: "h-12 w-12",
};

const LoadingSpinner = ({ size = "md", className = "" }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`
          ${sizes[size]}
          animate-spin rounded-full
          border-2 border-gray-200 border-t-secondary
        `}
      />
    </div>
  );
};

export default LoadingSpinner;
