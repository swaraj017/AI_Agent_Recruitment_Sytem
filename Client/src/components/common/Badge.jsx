import React from "react";

const variants = {
  default: "bg-muted text-muted-foreground",
  primary: "bg-foreground text-background",
  success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  warning: "bg-amber-50 text-amber-700 border border-amber-200",
  danger: "bg-red-50 text-red-700 border border-red-200",
  info: "bg-blue-50 text-blue-700 border border-blue-200",
  outline: "bg-transparent border border-border text-foreground",
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
        inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium
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
