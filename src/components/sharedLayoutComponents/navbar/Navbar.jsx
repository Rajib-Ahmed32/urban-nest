import { useState } from "react";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import UrbanNestLogo from "./UrbanNestLogo";
import { NavLinks } from "./NavLinks";
import { UserMenu } from "./UserMenu";
import { useAuth } from "../../../context/AuthContext";

const Navbar = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="flex justify-center items-center border-b bg-[#f9f9f7] text-foreground sticky top-0 z-50">
      <div className="container min-h-[75px] md:max-w-6xl lg:max-w-7xl mx-auto px-3 md:px-6 md:min-h-[80px] flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <UrbanNestLogo />
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          <NavLinks />
        </div>

        <div className="hidden lg:flex items-center gap-6">
          <UserMenu user={user} logout={logout} />
        </div>

        <div className="lg:hidden flex items-center gap-4">
          <UserMenu user={user} logout={logout} mobile />
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                aria-label="Open menu"
                className="h-10 w-10 rounded-md border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800 transition"
              >
                <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              </Button>
            </SheetTrigger>

            <SheetContent className="w-[260px] sm:w-[300px]">
              <SheetHeader>
                <SheetTitle>
                  <Link
                    to="/"
                    className="flex items-center gap-2"
                    onClick={() => setIsSheetOpen(false)}
                  >
                    <UrbanNestLogo />
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col mt-6 gap-4">
                <NavLinks
                  mobile
                  setIsSheetOpen={setIsSheetOpen}
                  className="nav-link"
                />
                {user && (
                  <Button
                    onClick={() => {
                      logout();
                      setIsSheetOpen(false);
                    }}
                    variant="destructive"
                    size="md"
                    className="mt-2"
                  >
                    Logout
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
