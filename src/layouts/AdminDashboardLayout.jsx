import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/sharedLayoutComponents/navbar/Navbar";
import Sidebar from "../components/commonReusableComponents/sidebar/Sidebar";
import MobileSidebarHeader from "../components/commonReusableComponents/MobileSidebarHeader";
import UrbanNestLogo from "../components/sharedLayoutComponents/navbar/UrbanNestLogo";
import { ToastProviderWrapper } from "../components/ui/use-toast";
import { adminSidebarLinks } from "../data/adminSidebarLinks";

const AdminDashboardLayout = () => {
  return (
    <ToastProviderWrapper>
      <div className="flex flex-col min-h-screen overflow-x-hidden">
        <header className="shadow">
          <Navbar />
        </header>

        <MobileSidebarHeader
          title="Admin Dashboard"
          links={adminSidebarLinks}
          LogoComponent={UrbanNestLogo}
        />

        <div className="flex flex-1">
          <aside className="hidden lg:block w-64 border-r border-gray-200 bg-white">
            <Sidebar title="Admin Dashboard" links={adminSidebarLinks} />
          </aside>

          <main className="flex-1 p-4 sm:p-6 md:p-8 bg-[#eaedf0] overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </ToastProviderWrapper>
  );
};

export default AdminDashboardLayout;
