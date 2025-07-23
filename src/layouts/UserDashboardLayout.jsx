import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/sharedLayoutComponents/navbar/Navbar";
import Sidebar from "../components/commonReusableComponents/sidebar/Sidebar";
import MobileSidebarHeader from "@/components/commonReusableComponents/MobileSidebarHeader";
import { userSidebarLinks } from "../data/userDashboardLinks";
import UrbanNestLogo from "../components/sharedLayoutComponents/navbar/UrbanNestLogo";

const UserDashboardLayout = () => {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-tr from-[#f6f7f8] to-[#eaeef1] text-gray-800 dark:text-white dark:from-[#1f1f1f] dark:to-[#151515] overflow-hidden">
      <header className="sticky top-0 z-30 bg-white dark:bg-gray-900 shadow">
        <Navbar />
      </header>
      <div className="lg:hidden sticky top-[4rem] z-20 bg-white dark:bg-gray-900">
        <MobileSidebarHeader
          title="User Dashboard"
          links={userSidebarLinks}
          LogoComponent={UrbanNestLogo}
        />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden lg:block w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
          <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
            <Sidebar title="User Dashboard" links={userSidebarLinks} />
          </div>
        </aside>
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 lg:px-10 py-10 md:py-14 bg-[#eaedf0]">
          <div className="max-w-screen-2xl mx-auto py-12 md:py-0 space-y-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboardLayout;
