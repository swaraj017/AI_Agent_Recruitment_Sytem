import React from "react";

const Input = ({
  label,
  error,
  icon,
  className = "",
  inputClassName = "",
  ...props
}) => {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-foreground mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {icon}
          </span>
        )}
        <input
          className={`
            w-full h-9 px-3 rounded-md border border-border bg-background
            focus:border-foreground focus:ring-1 focus:ring-foreground/10
            outline-none transition-colors text-sm
            placeholder:text-muted-foreground
            ${icon ? "pl-9" : ""}
            ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}
            ${inputClassName}
          `}
          {...props}
        />
      </div>
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
