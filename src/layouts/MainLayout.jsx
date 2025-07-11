import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/sharedLayoutComponents/navbar/Navbar";
import { ToastProviderWrapper } from "../components/ui/use-toast";

const MainLayout = () => {
  return (
    <ToastProviderWrapper>
      <div>
        <header>
          <Navbar />
        </header>
        <Outlet />
        <footer>footer</footer>
      </div>
    </ToastProviderWrapper>
  );
};

export default MainLayout;
