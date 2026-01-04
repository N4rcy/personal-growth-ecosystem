import React, { useState, useRef, useEffect } from "react";

const Select = ({ children, value, onValueChange, ...props }) => {
  return (
    <div className="relative" {...props}>
      {children}
    </div>
  );
};

const SelectTrigger = React.forwardRef(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
SelectTrigger.displayName = "SelectTrigger";

const SelectValue = ({ placeholder, children, ...props }) => {
  return (
    <span className="text-foreground" {...props}>
      {children || placeholder}
    </span>
  );
};
SelectValue.displayName = "SelectValue";

const SelectContent = React.forwardRef(
  ({ children, className, ...props }, ref) => {
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const triggerRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setPosition({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
        });
      }
    }, []);

    return (
      <>
        <div ref={triggerRef} style={{ display: "none" }} />
        <div
          ref={ref}
          className={`absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ${className}`}
          style={{
            position: "absolute",
            top: position.top,
            left: position.left,
          }}
          {...props}
        >
          {children}
        </div>
      </>
    );
  }
);
SelectContent.displayName = "SelectContent";

const SelectItem = React.forwardRef(
  ({ children, value, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
SelectItem.displayName = "SelectItem";

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
