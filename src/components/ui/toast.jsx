// components/ui/toast.js
import React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { cn } from "../../lib/utils";
import { Info, CheckCircle, AlertCircle, X } from "lucide-react";

const ToastProvider = ToastPrimitive.Provider;

const Toast = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitive.Root
    ref={ref}
    duration={7000}
    className={cn(
      "group pointer-events-auto relative flex w-full max-w-2xl items-start gap-4 rounded-2xl border border-gray-200 bg-white/90 px-8 py-6 shadow-2xl ring-1 ring-black/10 backdrop-blur-md transition-all",
      "data-[state=open]:animate-slide-in-top data-[state=closed]:animate-fade-out",
      "dark:bg-white/5 dark:border-neutral-700 dark:text-white",
      className
    )}
    {...props}
  />
));
Toast.displayName = ToastPrimitive.Root.displayName;

const ToastIcon = ({ variant }) => {
  switch (variant) {
    case "success":
      return <CheckCircle className="h-6 w-6 text-green-600" />;
    case "destructive":
      return <AlertCircle className="h-6 w-6 text-red-600" />;
    default:
      return <Info className="h-6 w-6 text-blue-600" />;
  }
};

const ToastTitle = React.forwardRef(
  ({ className, icon, children, ...props }, ref) => (
    <div className="flex items-center gap-3">
      {icon && <ToastIcon variant={icon} />}
      <ToastPrimitive.Title
        ref={ref}
        className={cn(
          "text-lg font-bold tracking-tight text-gray-900 dark:text-white",
          className
        )}
        {...props}
      >
        {children}
      </ToastPrimitive.Title>
    </div>
  )
);
ToastTitle.displayName = ToastPrimitive.Title.displayName;

const ToastDescription = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitive.Description
    ref={ref}
    className={cn(
      "mt-1 text-base leading-relaxed text-gray-600 dark:text-gray-300",
      className
    )}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitive.Description.displayName;

const ToastClose = () => (
  <ToastPrimitive.Close asChild>
    <button className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
      <X className="h-5 w-5" />
    </button>
  </ToastPrimitive.Close>
);

const ToastViewport = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitive.Viewport
    ref={ref}
    className={cn(
      "fixed top-6 left-1/2 z-[100] flex w-full max-w-xl -translate-x-1/2 flex-col gap-4 p-4",
      className
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitive.Viewport.displayName;

export {
  ToastProvider,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastViewport,
};
