import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Apartment", path: "/apartment" },
];

const baseNavStyle =
  "text-primary text-base duration-200 ease-in-out font-semibold transition-all hover:text-hover";
const activeNavStyle =
  "underline underline-offset-[30px] decoration-4 decoration-hover";

export const NavLinks = ({ mobile = false }) => {
  return (
    <>
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            `${baseNavStyle} ${mobile ? "" : isActive ? activeNavStyle : ""} ${
              mobile && isActive ? "text-hover" : ""
            }`
          }
        >
          {item.name}
        </NavLink>
      ))}
    </>
  );
};
