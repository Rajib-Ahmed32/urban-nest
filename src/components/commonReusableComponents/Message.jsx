import React from "react";
import { CheckCircle, XCircle, Info, AlertTriangle } from "lucide-react";

const iconMap = {
  success: <CheckCircle className="text-green-500 w-6 h-6" />,
  error: <XCircle className="text-red-500 w-6 h-6" />,
  info: <Info className="text-blue-500 w-6 h-6" />,
  warning: <AlertTriangle className="text-yellow-500 w-6 h-6" />,
};

export default function Message({
  text,
  type = "info",
  className = "",
  size = "text-lg",
  paddingY = "py-6",
  style = {},
}) {
  const icon = iconMap[type] || iconMap.info;
  const colorClass =
    {
      success: "text-green-700 bg-green-100",
      error: "text-red-700 bg-red-100",
      info: "text-blue-700 bg-blue-100",
      warning: "text-yellow-700 bg-yellow-100",
    }[type] || "text-gray-700 bg-gray-100";

  return (
    <div
      className={`flex items-center gap-3 justify-center rounded-md px-4 ${paddingY} ${colorClass} ${className}`}
      style={style}
    >
      {icon}
      <p className={`${size} font-medium select-none text-center`}>{text}</p>
    </div>
  );
}
