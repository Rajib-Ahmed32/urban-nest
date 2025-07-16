import { User, Megaphone } from "lucide-react";

export const userSidebarLinks = [
  {
    path: "/dashboard/user/profile",
    label: "My Profile",
    icon: <User className="w-5 h-5" />,
  },
  {
    path: "/dashboard/user/announcements",
    label: "Announcements",
    icon: <Megaphone className="w-5 h-5" />,
  },
];
