// Simpler Toast implementation that works without the import issue
import { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle, XCircle, AlertCircle, X, Info } from "lucide-react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "info", duration = 4000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, duration }]);

    // Auto remove after duration
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, duration);

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const success = useCallback(
    (message, duration) => showToast(message, "success", duration),
    [showToast]
  );
  const error = useCallback(
    (message, duration) => showToast(message, "error", duration),
    [showToast]
  );
  const warning = useCallback(
    (message, duration) => showToast(message, "warning", duration),
    [showToast]
  );
  const info = useCallback(
    (message, duration) => showToast(message, "info", duration),
    [showToast]
  );

  const ToastComponent = ({ toast }) => {
    const icons = {
      success: <CheckCircle className="h-5 w-5 text-green-500" />,
      error: <XCircle className="h-5 w-5 text-red-500" />,
      warning: <AlertCircle className="h-5 w-5 text-yellow-500" />,
      info: <Info className="h-5 w-5 text-blue-500" />,
    };

    const bgColors = {
      success:
        "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800",
      error: "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800",
      warning:
        "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800",
      info: "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800",
    };

    const textColors = {
      success: "text-green-800 dark:text-green-200",
      error: "text-red-800 dark:text-red-200",
      warning: "text-yellow-800 dark:text-yellow-200",
      info: "text-blue-800 dark:text-blue-200",
    };

    return (
      <div
        className={`fixed top-4 right-4 z-[100] animate-in slide-in-from-right-2 duration-200`}
      >
        <div
          className={`${
            bgColors[toast.type]
          } border rounded-lg shadow-lg p-4 max-w-sm`}
        >
          <div className="flex items-start gap-3">
            {icons[toast.type]}
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${textColors[toast.type]}`}>
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <ToastContext.Provider value={{ showToast, success, error, warning, info }}>
      {children}
      {toasts.map((toast) => (
        <ToastComponent key={toast.id} toast={toast} />
      ))}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
};
