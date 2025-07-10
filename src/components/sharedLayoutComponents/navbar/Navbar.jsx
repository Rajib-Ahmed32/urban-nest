import { useState } from "react";
import { Menu } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

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

const baseNavStyle =
  "text-primary text-base duration-200 ease-in-out font-semibold transition-all hover:text-hover";

const Navbar = () => {
  const [user, setUser] = useState({
    name: "Rajib Ahmed",
    avatar: "https://flowbite.com/docs/images/people/profile-picture-3.jpg",
  });

  return (
    <nav className="flex justify-center items-center border-b bg-background text-foreground sticky top-0 z-50">
      <div className="container min-h-[75px] md:max-w-6xl lg:max-w-7xl mx-auto px-3 md:px-6 md:min-h-[80px] flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <UrbanNestLogo />
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          <NavLinks />
        </div>

        <div className="hidden lg:flex items-center gap-6">
          <UserMenu user={user} setUser={setUser} />
        </div>

        <div className="lg:hidden flex items-center gap-4">
          <UserMenu user={user} setUser={setUser} mobile />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open menu">
                <Menu className="h-10 w-10" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[260px] sm:w-[300px]">
              <SheetHeader>
                <SheetTitle>
                  <Link to="/" className="flex items-center gap-2">
                    <UrbanNestLogo />
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col mt-6 gap-4">
                <NavLinks mobile />
                {user && (
                  <>
                    <NavLink
                      to="/dashboard/user"
                      className={({ isActive }) =>
                        `${baseNavStyle} ${isActive ? "text-hover" : ""}`
                      }
                    >
                      Dashboard
                    </NavLink>
                    <button
                      onClick={() => setUser(null)}
                      className={`${baseNavStyle} w-full text-left`}
                    >
                      Logout
                    </button>
                  </>
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
