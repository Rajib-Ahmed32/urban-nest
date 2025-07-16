import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ title = "Dashboard", setIsSheetOpen, links = [] }) => {
  return (
    <nav className="w-full min-h-screen bg-gradient-to-b from-[#f9f9f7] to-[#f7f7ed] border-r border-gray-200 px-6 py-10 shadow-md">
      <h2
        className="
    text-base font-semibold tracking-widest uppercase mb-6 pb-2
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

      <ul className="space-y-1">
        {links.map(({ path, label, icon }) => (
          <li key={path}>
            <NavLink
              to={path}
              onClick={() => setIsSheetOpen?.(false)}
              className={({ isActive }) => {
                return `
          flex items-center gap-3 px-4 py-2 rounded-md transition-colors duration-200 cursor-pointer select-none
          ${
            isActive
              ? "bg-orange-100 text-orange-700 font-medium shadow-sm"
              : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
          }
        `;
              }}
              end
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`flex items-center justify-center text-xl ${
                      isActive ? "text-orange-700" : "text-gray-500"
                    }`}
                  >
                    {icon}
                  </span>
                  <span className="text-sm font-medium leading-tight">
                    {label}
                  </span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
