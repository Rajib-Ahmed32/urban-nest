import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetOverlay,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Sidebar from "./sidebar/Sidebar";

const MobileSidebarHeader = ({
  title = "Dashboard",
  links = [],
  LogoComponent,
}) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <div className="lg:hidden rounded-md sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#f0f4f8] to-[#e9eef3] dark:from-[#1f2937] dark:to-[#111827] shadow-sm border-b border-gray-300 dark:border-gray-700">
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open Sidebar"
            className="h-10 w-10 rounded-full border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-800/60 backdrop-blur-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <Menu className="h-6 w-6 text-gray-800 dark:text-white" />
          </Button>
        </SheetTrigger>
        <SheetOverlay className="bg-black/30 backdrop-blur-sm" />
        <SheetContent
          side="left"
          className="w-[260px] sm:w-[300px] p-0 bg-gradient-to-b from-white to-[#f8f9fa] dark:from-gray-900 dark:to-gray-800 shadow-xl"
        >
          <SheetHeader className="border-b px-4 py-4 bg-gray-100 dark:bg-gray-900">
            <div className="flex items-center gap-2">
              {LogoComponent && <LogoComponent />}
            </div>
          </SheetHeader>

          <Sidebar
            title={title}
            setIsSheetOpen={setIsSheetOpen}
            links={links}
          />
        </SheetContent>
      </Sheet>
      <h2
        className="
          text-base font-semibold tracking-widest uppercase
          border-b border-gray-300
          text-gray-700 dark:text-gray-300
          select-none
          bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600
          bg-clip-text text-transparent
          drop-shadow-md
        "
      >
        {title}
      </h2>
    </div>
  );
};

export default MobileSidebarHeader;
