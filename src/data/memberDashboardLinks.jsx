import {
  User,
  CreditCard,
  ClipboardList,
  Megaphone,
  BellRing,
} from "lucide-react";

export const memberSidebarLinks = [
  { path: "/dashboard/member/profile", label: "My Profile", icon: <User /> },
  {
    path: "/dashboard/member/make-payment",
    label: "Make Payment",
    icon: <CreditCard />,
  },
  {
    path: "/dashboard/member/payment-history",
    label: "Payment History",
    icon: <ClipboardList />,
  },
  {
    path: "/dashboard/member/announcements",
    label: "Announcements",
    icon: <Megaphone />,
  },
  {
    path: "/dashboard/member/member-notices",
    label: "Rent Notices",
    icon: <BellRing />,
  },
];
