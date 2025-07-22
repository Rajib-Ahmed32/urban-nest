import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/sharedLayoutComponents/navbar/Navbar";
import { ToastProviderWrapper } from "../components/ui/use-toast";
import Footer from "../components/commonReusableComponents/Footer";

const MainLayout = () => {
  return (
    <ToastProviderWrapper>
      <div className="flex flex-col min-h-screen">
        <header className="sticky top-0 z-50 bg-[#eaedf0] shadow">
          <Navbar />
        </header>
        <main className="w-full min-h-screen mx-auto px-4 md:px-0">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ToastProviderWrapper>
  );
};

export default MainLayout;
