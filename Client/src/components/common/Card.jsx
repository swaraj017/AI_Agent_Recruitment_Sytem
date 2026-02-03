import React from "react";

const Card = ({ children, className = "", hover = false, ...props }) => {
  return (
    <div
      className={`
        bg-white rounded-2xl border border-gray-100 p-5 relative
        ${hover ? "hover:shadow-lg hover:border-gray-200 transition-all duration-200 cursor-pointer" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
