import AdminLogin from "../../pages/admin/AdminLogin";
import Admin from "../../pages/admin/Admin";
import Error from "../../pages/error/Error";
import Home from "../../components/admin/Home";
import AdminPostC from "../../components/admin/AdminPostsC";
import Reports from "../../components/admin/Reports";
import AdminAds from "../../components/admin/AdminAds";

export const adminRoutes = {
  path: "/admin",
  element: <Admin />,
  errorElement: <Error />,
  children: [
    {
      path: "/admin",
      element: <Home />,
    },
    {
      path: "/admin/posts",
      element: <AdminPostC />,
    },
    {
      path: "/admin/reports",
      element: <Reports />,
    },
    {
      path: "/admin/ads",
      element: <AdminAds />,
    },
  ],
};
export const adminLogin = {
  path: "/admin/login",
  element: <AdminLogin />,
};
