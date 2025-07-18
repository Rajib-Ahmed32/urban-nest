import React from "react";
import { User, Users, Megaphone, FileCheck, Percent } from "lucide-react";

export const adminSidebarLinks = [
  {
    path: "/dashboard/admin/profile",
    label: "Admin Profile",
    icon: <User />,
  },
  {
    path: "/dashboard/admin/manage-members",
    label: "Manage Members",
    icon: <Users />,
  },
  {
    path: "/dashboard/admin/make-announcement",
    label: "Make Announcement",
    icon: <Megaphone />,
  },
  {
    path: "/dashboard/admin/agreement-requests",
    label: "Agreement Requests",
    icon: <FileCheck />,
  },
  {
    path: "/dashboard/admin/manage-coupons",
    label: "Manage Coupons",
    icon: <Percent />,
  },
];
