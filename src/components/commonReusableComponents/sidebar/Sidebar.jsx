import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar = ({ title = "Dashboard", setIsSheetOpen, links = [] }) => {
  const { pathname } = useLocation();

  return (
    <nav className="w-full min-h-screen bg-white dark:bg-gray-900 border-r px-4 py-8 shadow-md">
      <div className="mb-8 px-2">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 tracking-wide uppercase">
          {title}
        </h2>
      </div>
      <ul className="space-y-1">
        {links.map(({ path, label, icon }) => {
          const isProfileLink = path.includes("/profile");
          const basePath = path.split("/profile")[0];
          const isActive =
            pathname === path ||
            pathname.startsWith(path + "/") ||
            (isProfileLink && pathname === basePath);

          return (
            <li key={path}>
              <NavLink
                to={path}
                onClick={() => setIsSheetOpen?.(false)}
                className={`group flex items-center gap-4 px-4 py-2 rounded-lg transition-all duration-200
                  ${
                    isActive
                      ? "bg-orange-100 text-orange-700 font-semibold border-l-4 border-orange-500"
                      : "text-gray-600 hover:bg-gray-100 hover:text-orange-600 dark:text-gray-300 dark:hover:bg-gray-800"
                  }
                `}
              >
                <span
                  className={`w-8 h-8 flex items-center justify-center rounded-md transition-all duration-200
                    ${
                      isActive
                        ? "bg-orange-200 text-orange-700"
                        : "bg-gray-100 text-gray-500 group-hover:bg-orange-100 group-hover:text-orange-600 dark:bg-gray-700 dark:text-gray-300"
                    }
                  `}
                >
                  {icon}
                </span>

                <span className="text-sm tracking-wide">{label}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Sidebar;
