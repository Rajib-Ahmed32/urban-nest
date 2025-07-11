import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Apartment", path: "/apartment" },
];

const baseNavStyle =
  "text-primary text-base duration-200 ease-in-out font-semibold transition-all hover:text-hover";

const activeNavStyleDesktop =
  "underline underline-offset-[30px] decoration-4 decoration-hover";

const activeNavStyleMobile = "!text-hover";

export const NavLinks = ({ mobile = false, setIsSheetOpen }) => {
  return (
    <>
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          end={item.path === "/"}
          onClick={() => {
            if (mobile && setIsSheetOpen) {
              setIsSheetOpen(false);
            }
          }}
          className={({ isActive }) =>
            `${baseNavStyle} ${
              isActive
                ? mobile
                  ? activeNavStyleMobile
                  : activeNavStyleDesktop
                : ""
            }`
          }
        >
          {item.name}
        </NavLink>
      ))}
    </>
  );
};
