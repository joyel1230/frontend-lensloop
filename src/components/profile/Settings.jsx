import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { changeTheme } from "../../utils/reduxSlices/theme";

const Settings = () => {
  let username = "joyel";
  const dispatch=useDispatch()
  return (
    <div className="flex flex-col  w-34 border border-black rounded absolute bg-slate-400 top-8 right-0">
      <div className="h-1/3 border-b border-black text-center cursor-pointer font-bold font-sans select-none" onClick={()=>{dispatch(changeTheme())}} >
       <span className="text-white">Light O</span>
       <span className="text-black">R Dark</span> 
      </div>
      <Link to={`/${username}/edit-profile`}>
        <div className="h-1/3 border-b border-black text-center font-bold font-sans">
          Edit Profile
        </div>
      </Link>
      <Link to={`/${username}/change-password`}>
        <div className="h-1/3 border-b border-black text-center font-bold font-sans">
          Change Password
        </div>
      </Link>
      <div className="h-1/3 text-center text-red-500 cursor-pointer font-bold ">
        Logout
      </div>
    </div>
  );
};

export default Settings;
