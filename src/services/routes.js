import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Error from "../pages/error/Error";
import Home from "../pages/home/Home";
import Profile from "../pages/profile/Profile";
import ForgotPass from "../pages/login/ForgotPass";
import { adminLogin, adminRoutes } from "./admin/routes";
import NewPost from "../pages/post/NewPost";
import EditProfile from "../components/profile/options/EditProfile";
import ChangePass from "../components/profile/options/ChangePass";
import SinglePost from "../pages/post/SinglePost";
import Explore from "../pages/explore/explore";

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
      },
      {
        path: "/:username/edit-profile",
        element: <EditProfile />,
      },
      {
        path: "/:username/change-password",
        element: <ChangePass />,
      },
      {
        path: "/new-post",
        element: <NewPost />,
      },
      {
        path: "/posts/:id",
        element: <SinglePost />,
      },
      {
        path: "/explore",
        element: <Explore />,
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
  adminLogin
]);

export default appRouter;
