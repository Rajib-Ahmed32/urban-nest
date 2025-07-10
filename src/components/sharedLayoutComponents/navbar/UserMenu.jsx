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

const baseNavStyle =
  "text-primary text-base duration-200 ease-in-out font-semibold transition-all hover:text-hover";

export const UserMenu = ({ user, setUser, mobile = false }) => {
  const isLoggedIn = !!user;

  if (isLoggedIn) {
    if (mobile) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <img
              src={user.avatar}
              alt="Profile"
              className="w-10 h-10 rounded-full cursor-pointer"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <NavLink
                to="/dashboard/user"
                className={({ isActive }) =>
                  `${baseNavStyle} ${isActive ? "text-hover" : ""}`
                }
              >
                Dashboard
              </NavLink>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <button
                onClick={() => setUser(null)}
                className={`${baseNavStyle} w-full text-left`}
              >
                Logout
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <img
            src={user.avatar}
            alt="Profile"
            className="w-11 h-11 rounded-full cursor-pointer"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <NavLink to="/dashboard/user" className={baseNavStyle}>
              Dashboard
            </NavLink>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <button
              onClick={() => setUser(null)}
              className={`${baseNavStyle} w-full text-left`}
            >
              Logout
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  if (mobile) {
    return (
      <Link
        to="/login"
        className="px-4 py-2 text-sm font-medium rounded-md bg-primary text-white hover:bg-hover"
      >
        Login
      </Link>
    );
  }

  return (
    <Button asChild size="md" variant="login">
      <Link to="/login">Login</Link>
    </Button>
  );
};
