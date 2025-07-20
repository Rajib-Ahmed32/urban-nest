import React, { createContext, useContext, useState, useCallback } from "react";
import {
  ToastProvider,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastViewport,
} from "./toast";

import { CheckCircle, AlertCircle, Info } from "lucide-react";

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProviderWrapper");
  }
  return context;
};

export const ToastProviderWrapper = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback(({ title, description, variant = "default" }) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, title, description, variant }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 7000);
  }, []);

  const handleRemove = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      <ToastProvider>
        {children}

        <ToastViewport className="fixed top-6 right-6 z-[9999] space-y-4 w-[420px] max-w-[95vw]" />

        {toasts.map(({ id, title, description, variant }) => {
          const isError = variant === "destructive";
          const Icon = isError
            ? AlertCircle
            : variant === "info"
            ? Info
            : CheckCircle;

          return (
            <Toast
              key={id}
              onOpenChange={(open) => {
                if (!open) handleRemove(id);
              }}
              duration={5000}
              className={`
                flex items-start gap-4 p-5 pl-6 rounded-xl shadow-2xl border-l-[6px]
                animate-slideIn
                ${
                  isError
                    ? "bg-red-50 dark:bg-red-900 border-red-600 text-red-800 dark:text-red-100"
                    : "bg-white dark:bg-neutral-900 border-[#ec5407] text-gray-900 dark:text-white"
                }
              `}
            >
              <Icon
                className={`w-7 h-7 mt-1 shrink-0 ${
                  isError ? "text-red-600" : "text-[#ec5407]"
                }`}
              />
              <div className="flex flex-col flex-1">
                <ToastTitle className="text-lg font-bold leading-snug">
                  {title}
                </ToastTitle>
                {description && (
                  <ToastDescription className="text-sm text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
                    {description}
                  </ToastDescription>
                )}
              </div>
              <ToastClose />
            </Toast>
          );
        })}
      </ToastProvider>
    </ToastContext.Provider>
  );
};
