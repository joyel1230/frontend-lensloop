import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Error from "../pages/error/Error";
import Home from "../pages/home/Home";
import Profile from "../pages/profile/Profile";
import ForgotPass from "../pages/login/ForgotPass";
// import AdminLogin from "../components/admin/AdminLogin";
// import Admin from "../pages/admin/Admin";
// import AdminHome from "../pages/admin/AdminHome";
import { adminRoutes } from "./admin/routes";
import NewPost from "../pages/post/NewPost";
import ProfilePostSection from "../components/profile/ProfilePostSection";
import EditProfile from "../components/profile/EditProfile";
import ChangePass from "../components/profile/ChangePass";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/:username",
        element: <Profile />,
        children:[
          {
            path: "/:username",
            element: <ProfilePostSection />,
          },
          {
            path: "/:username/edit-profile",
            element: <EditProfile />,
          },
          {
            path: "/:username/change-password",
            element: <ChangePass />,
          },
        ]
      },
      {
        path: "/new-post",
        element: <NewPost />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot",
    element: <ForgotPass />,
  },

  
  // admin routes
  adminRoutes,
]);

export default appRouter;
