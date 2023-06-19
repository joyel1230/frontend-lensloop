import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Error from "../pages/error/Error";
import Home from "../pages/home/Home";
import Profile from "../pages/profile/Profile";
import ForgotPass from "../pages/login/ForgotPass";

const appRouter = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        errorElement:<Error/>,
        children:[
            {
                path:'/',
                element:<Home/>
            },
            {
                path:'/:username',
                element:<Profile/>
            },
        ]
    },
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/register',
        element:<Register/>
    },
    {
        path:'/forgot',
        element:<ForgotPass/>
    }
]);

export default appRouter;
