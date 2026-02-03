import React from "react";

const variants = {
  default: "bg-gray-100 text-gray-600",
  primary: "bg-secondary/10 text-secondary",
  success: "bg-green-100 text-green-700",
  warning: "bg-yellow-100 text-yellow-700",
  danger: "bg-red-100 text-red-700",
  info: "bg-blue-100 text-blue-700",
  outline: "bg-white border border-gray-200 text-gray-600",
};

const Badge = ({
  children,
  variant = "default",
  className = "",
  removable = false,
  onRemove,
}) => {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium
        ${variants[variant]}
        ${className}
      `}
    >
      {removable && (
        <button
          onClick={onRemove}
          className="hover:opacity-70 -ml-0.5"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
      {children}
    </span>
  );
};

export default Badge;
