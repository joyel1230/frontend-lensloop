import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AdminAuthMiddleWare } from "../../services/authMiddleWare";
import AdminNavBar from "../../components/admin/Navbar";

const Admin = () => {
  const adminCheck = AdminAuthMiddleWare();
  const navigate = useNavigate();
  useEffect(() => {
    if (!adminCheck.admin) {
      navigate("/admin/login");
    }
  }, [adminCheck.admin, navigate]);
  return     <>
  {adminCheck.admin && (
    <div
      className={`h-screen w-full bg-[#cacaca] text-[#141414] duration-500 ease-in-out transform`}
    >
      <div className="h-screen w-full flex flex-col justify-between">
        <div className="w-full h-full flex mt-0">
          <div className="w-[20%] min-w-fit h-full p-1 py-5 sm:py-1">
            <AdminNavBar />
          </div>
          <div className="w-[80%]  overflow-y-auto max-h-[100%] py-10 px-2 hide-scrollbar">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )}
</>;
};

export default Admin;
