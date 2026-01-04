import React from "react";

const Separator = ({
  className = "",
  orientation = "horizontal",
  ...props
}) => {
  const baseStyles =
    orientation === "horizontal" ? "h-px w-full" : "h-full w-px";

  return (
    <div
      className={`${baseStyles} bg-border ${className}`}
      role="separator"
      aria-orientation={orientation}
      {...props}
    />
  );
};

export { Separator };
