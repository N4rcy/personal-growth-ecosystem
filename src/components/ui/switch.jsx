import React from "react";

const Switch = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div className="relative">
      <input
        type="checkbox"
        ref={ref}
        className={`peer sr-only ${className}`}
        {...props}
      />
      <div className="peer h-6 w-11 rounded-full bg-gray-200 dark:bg-gray-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:border-gray-600 dark:peer-focus:ring-blue-800"></div>
    </div>
  );
});
Switch.displayName = "Switch";

export { Switch };
