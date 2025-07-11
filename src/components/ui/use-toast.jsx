import React, { createContext, useContext, useState, useCallback } from "react";
import {
  ToastProvider,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastViewport,
} from "./toast";

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
  }, []);

  const handleRemove = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      <ToastProvider>
        {children}
        <ToastViewport>
          {toasts.map(({ id, title, description, variant }) => (
            <Toast
              key={id}
              onOpenChange={(open) => {
                if (!open) handleRemove(id);
              }}
              className={
                variant === "destructive"
                  ? "bg-red-50 border border-red-600"
                  : ""
              }
            >
              <ToastTitle>{title}</ToastTitle>
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </Toast>
          ))}
        </ToastViewport>
      </ToastProvider>
    </ToastContext.Provider>
  );
};
