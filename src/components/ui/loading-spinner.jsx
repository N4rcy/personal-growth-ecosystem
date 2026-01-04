const LoadingSpinner = ({ size = "default", className = "" }) => {
  const sizes = {
    small: "h-4 w-4",
    default: "h-8 w-8",
    large: "h-12 w-12",
    xlarge: "h-16 w-16",
  };

  return (
    <div
      className={`inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent ${sizes[size]} ${className}`}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
