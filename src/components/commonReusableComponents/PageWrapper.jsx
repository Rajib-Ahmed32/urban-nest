import React from "react";

const PageWrapper = ({ children, className = "" }) => {
  return (
    <div className={`w-full max-w-screen-md mx-auto md:px-8 ${className}`}>
      {children}
    </div>
  );
};

export default PageWrapper;
