import React from "react";

const Card = ({ children, className = "", hover = false, ...props }) => {
  return (
    <div
      className={`
        bg-card rounded-lg border border-border p-4 relative
        ${hover ? "hover:border-foreground/20 transition-colors cursor-pointer" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
