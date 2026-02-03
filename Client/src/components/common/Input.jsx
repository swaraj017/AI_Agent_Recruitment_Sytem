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
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </span>
        )}
        <input
          className={`
            w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white
            focus:border-secondary focus:ring-2 focus:ring-secondary/20
            outline-none transition-all text-sm
            placeholder:text-gray-400
            ${icon ? "pl-10" : ""}
            ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}
            ${inputClassName}
          `}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
