import AdminLogin from "../../components/admin/AdminLogin";
import Admin from "../../pages/admin/Admin";
import AdminHome from "../../pages/admin/AdminHome";
import Error from "../../pages/error/Error";

export const adminRoutes={
    path:'/admin',
    element:<Admin/>,
    errorElement:<Error/>,
    children:[
        {
            path:'/admin',
            element:<AdminHome/>
        },
        {
            path:'/admin/login',
            element:<AdminLogin/>
        }
    ]
}