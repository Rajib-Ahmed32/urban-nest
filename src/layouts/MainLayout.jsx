import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/sharedLayoutComponents/navbar/Navbar";
import { ToastProviderWrapper } from "../components/ui/use-toast";

const MainLayout = () => {
  return (
    <ToastProviderWrapper>
      <div className="min-h-screen flex flex-col bg-[#eaedf0]">
        <header className="sticky top-0 z-50 bg-[#eaedf0] shadow">
          <Navbar />
        </header>
        <main className="flex-1 max-w-7xl w-full mx-auto md:px-4">
          <Outlet />
        </main>
        <footer className="bg-[#373536] text-white py-6 text-center text-sm">
          © {new Date().getFullYear()} UrbanNest. All rights reserved.
        </footer>
      </div>
    </ToastProviderWrapper>
  );
};

export default MainLayout;
