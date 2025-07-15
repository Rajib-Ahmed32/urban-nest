import { NavLink, Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { UserCircle2 } from "lucide-react";

const PRIMARY_ORANGE = "#dd4b08";

export const UserMenu = ({ user, logout, mobile = false }) => {
  const isLoggedIn = !!user;

  const menuStyles =
    "w-60 bg-white rounded-lg shadow-lg p-0 text-gray-900 ring-1 ring-black ring-opacity-5";

  if (isLoggedIn) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {user?.photoURL || user?.avatar ? (
            <img
              src={
                user.photoURL ||
                user.avatar ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="User Avatar"
              className="w-10 h-10 rounded-full object-cover cursor-pointer border-2 border-[#dd4b08]"
              title={user.name || user.email}
            />
          ) : (
            <UserCircle2
              className="w-10 h-10 text-[#dd4b08] cursor-pointer"
              title={user.name || user.email}
            />
          )}
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className={menuStyles} sideOffset={8}>
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
            <p className="text-lg font-semibold text-gray-900 truncate">
              {user.name || user.email}
            </p>
          </div>

          <DropdownMenuItem className="p-0 border-b-2 border-gray-700">
            <NavLink
              to={`/dashboard/${user.role}`}
              className={({ isActive }) =>
                `w-full block rounded-none bg-[#373536] text-white font-semibold px-6 py-3
                hover:bg-[#dd4b08] hover:text-white transition-colors
                ${isActive ? "bg-[#dd4b08]" : ""}`
              }
            >
              Dashboard
            </NavLink>
          </DropdownMenuItem>

          <DropdownMenuItem className="p-0">
            <Button
              onClick={logout}
              className="w-full px-6 py-3 rounded-none bg-[#373536] text-white font-semibold hover:bg-[#dd4b08] hover:text-white text-left justify-start"
            >
              Logout
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  if (mobile) {
    return (
      <Link
        to="/login"
        className="block w-full text-center px-4 py-2 text-sm font-semibold rounded-md bg-[#dd4b08] text-white hover:bg-orange-600 transition"
      >
        Login
      </Link>
    );
  }

  return (
    <Button
      asChild
      className="px-4 py-2 text-sm font-semibold rounded-md bg-[#dd4b08] text-white hover:bg-orange-600 transition"
    >
      <Link to="/login">Login</Link>
    </Button>
  );
};
