import Navbar from "../components/sharedLayoutComponents/navbar/Navbar";
import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <Outlet />
      <footer>footer</footer>
    </div>
  );
};

export default MainLayout;
