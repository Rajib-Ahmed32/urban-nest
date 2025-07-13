import { NavLink, Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export const UserMenu = ({ user, logout, mobile = false }) => {
  const isLoggedIn = !!user;

  const menuStyles = "w-48 bg-white rounded shadow p-2 text-gray-800";

  const itemLinkStyles = ({ isActive }) =>
    `block px-3 py-2 rounded hover:bg-gray-100 ${
      isActive ? "text-primary font-semibold" : ""
    }`;

  if (isLoggedIn) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <img
            src={
              user?.photoURL ||
              user?.avatar ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="User Avatar"
            className="w-10 h-10 rounded-full object-cover cursor-pointer"
          />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className={menuStyles}>
          <DropdownMenuLabel className="px-3 text-sm font-semibold">
            {user.name || user.email}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <NavLink to={`/dashboard/${user.role}`} className={itemLinkStyles}>
              Dashboard
            </NavLink>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <Button
              onClick={logout}
              variant="outline"
              size="sm"
              className="w-full justify-start rounded"
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
        className="px-4 py-2 text-sm font-medium rounded bg-primary text-white hover:bg-primary-dark"
      >
        Login
      </Link>
    );
  }

  return (
    <Button asChild variant="login" size="sm">
      <Link to="/login">Login</Link>
    </Button>
  );
};
