import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Error from "../pages/error/Error";
import Home from "../pages/home/Home";
import Profile from "../pages/profile/Profile";

const appRouter = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        errorElement:<Error/>,
        children:[
            {
                path:'/:username',
                element:<Home/>
            },
            {
                path:'/:username/profile',
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
    }
]);

export default appRouter;
