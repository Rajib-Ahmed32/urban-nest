import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-6">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-[#ec5407] mb-4">404</h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#ec5407] text-white hover:bg-[#cf4700] transition"
        >
          <ArrowLeft size={18} />
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
