import { createBrowserRouter } from "react-router-dom";

// Layouts
import MainLayout from "../layouts/MainLayout";
import UserDashboardLayout from "../layouts/UserDashboardLayout";
import MemberDashboardLayout from "../layouts/MemberDashboardLayout";
import AdminDashboardLayout from "../layouts/AdminDashboardLayout";

// Public Pages
import Home from "../pages/Home";
import Apartment from "../pages/Apartment";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";

// User Dashboard Pages
import UserProfile from "../dashboard/user/UserProfile";
import UserAnnouncements from "../dashboard/user/Announcements";

// Member Dashboard Pages
import MemberProfile from "../dashboard/member/MemberProfile";
import MakePayment from "../dashboard/member/MakePayment";
import PaymentHistory from "../dashboard/member/PaymentHistory";
import MemberAnnouncements from "../dashboard/member/Announcements";

// Admin Dashboard Pages
import AdminProfile from "../dashboard/admin/AdminProfile";
import ManageMembers from "../dashboard/admin/ManageMembers";
import MakeAnnouncement from "../dashboard/admin/MakeAnnouncement";
import AgreementRequests from "../dashboard/admin/AgreementRequests";
import ManageCoupons from "../dashboard/admin/ManageCoupons";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/apartment", element: <Apartment /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
  {
    path: "/dashboard/user",
    element: <UserDashboardLayout />,
    children: [
      { index: true, element: <UserProfile /> },
      { path: "profile", element: <UserProfile /> },
      { path: "announcements", element: <UserAnnouncements /> },
    ],
  },
  {
    path: "/dashboard/member",
    element: <MemberDashboardLayout />,
    children: [
      { index: true, element: <MemberProfile /> },
      { path: "profile", element: <MemberProfile /> },
      { path: "make-payment", element: <MakePayment /> },
      { path: "payment-history", element: <PaymentHistory /> },
      { path: "announcements", element: <MemberAnnouncements /> },
    ],
  },
  {
    path: "/dashboard/admin",
    element: <AdminDashboardLayout />,
    children: [
      { index: true, element: <AdminProfile /> },
      { path: "profile", element: <AdminProfile /> },
      { path: "manage-members", element: <ManageMembers /> },
      { path: "make-announcement", element: <MakeAnnouncement /> },
      { path: "agreement-requests", element: <AgreementRequests /> },
      { path: "manage-coupons", element: <ManageCoupons /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default Router;
