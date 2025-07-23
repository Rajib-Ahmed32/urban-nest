import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/sharedLayoutComponents/navbar/Navbar";
import Sidebar from "../components/commonReusableComponents/sidebar/Sidebar";
import MobileSidebarHeader from "../components/commonReusableComponents/MobileSidebarHeader";
import UrbanNestLogo from "../components/sharedLayoutComponents/navbar/UrbanNestLogo";
import { ToastProviderWrapper } from "../components/ui/use-toast";
import { memberSidebarLinks } from "../data/memberDashboardLinks";

const MemberDashboardLayout = () => {
  return (
    <ToastProviderWrapper>
      <div className="flex flex-col bg-gradient-to-tr from-[#f6f7f8] to-[#eaeef1] text-gray-800 dark:text-white dark:from-[#1f1f1f] dark:to-[#151515] overflow-hidden">
        <header className="sticky top-0 z-30 bg-white dark:bg-gray-900 shadow">
          <Navbar />
        </header>
        <div className="lg:hidden sticky top-[4rem] z-20 bg-white dark:bg-gray-900">
          <MobileSidebarHeader
            title="Member Dashboard"
            links={memberSidebarLinks}
            LogoComponent={UrbanNestLogo}
          />
        </div>

        <div className="flex flex-1 overflow-hidden">
          <aside className="hidden lg:block w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
            <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
              <Sidebar title="Member Dashboard" links={memberSidebarLinks} />
            </div>
          </aside>
          <main className="flex-1 min-h-screen overflow-y-auto md:px-8 lg:px-10 py-10 md:py-14">
            <div className="max-w-screen-2xl py-12 md:py-0  mx-auto space-y-6 my-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </ToastProviderWrapper>
  );
};

export default MemberDashboardLayout;
