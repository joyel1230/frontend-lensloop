import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { changeTheme } from "../../../utils/reduxSlices/theme";
import { removeReduxUser } from "../../../utils/reduxSlices/user";
import { GetUsernameFromRedux } from "../../../utils/userInRedux";

const Settings = ({fun}) => {
  const [checked, setChecked] = useState(false);
  const naviagte = useNavigate();
  const dispatch = useDispatch();
  const themeSwitch = useSelector((store) => store?.theme?.currentTheme);
  const userDetails=GetUsernameFromRedux()
  const username = userDetails?.username;
  useEffect(() => {
    if (themeSwitch === "light") {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [themeSwitch]);
  const handleSwitch = () => {
    if (themeSwitch !== "light") {
      setChecked(true);
    } else {
      setChecked(false);
    }
  };
  const handleLogout = () => {
    dispatch(removeReduxUser());
    naviagte("../login");
  };
  return (
    <div className="flex flex-col gap-2  w-[75%] border border-current rounded-xl mt-2 select-none " onClick={()=>fun(false)}>
      <div className=" border-b border-current text-center relative py-3">
        Switch to light
        <input
          className="ml-3 h-[0.845rem] w-6 appearance-none rounded-[0.4375rem] bg-current before:pointer-events-none 
          before:absolute before:h-3.5 before:w-3.5 before:rounded-full after:absolute after:z-[2] after:-mt-[-0.0625rem] 
          after:h-3 after:w-3 after:-ml-[-1px] after:rounded-full after:bg-gray-500  after:transition-[background-color_0.2s,transform_0.2s] 
          checked:after:absolute checked:after:z-[2] checked:after:-mt-[-0.0625rem] checked:after:ml-[0.65rem] checked:after:h-3 
          checked:after:w-3 checked:after:rounded-full checked:after:border-none  
          checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer  "
          type="checkbox"
          role="switch"
          checked={checked}
          onChange={()=>handleSwitch()}
          onClick={() => {
            dispatch(changeTheme());
            handleSwitch();
          }}
        />
      </div>
      <Link to={`/${username}/edit-profile`}>
        <div className=" border-b border-current text-center">Edit Profile</div>
      </Link>
      <Link to={`/${username}/change-password`}>
        <div className=" border-b border-current text-center">
          Change Password
        </div>
      </Link>
      <div
        className=" text-center text-red-500 cursor-pointer font-bold"
        onClick={() => handleLogout()}
      >
        Logout
      </div>
    </div>
  );
};

export default Settings;
