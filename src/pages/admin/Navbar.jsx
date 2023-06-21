import React, { useState } from "react";
// import { AiOutlineHome } from "react-icons/ai";
import { FiUsers, FiLogOut } from "react-icons/fi";
import { BsCashStack } from "react-icons/bs";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import Logo from "../../components/micros/Logo";
import { Link } from "react-router-dom";
import { removeAdmin } from "../../utils/reduxSlices/admin";
import { useDispatch } from "react-redux";

const AdminNavBar = () => {
  const dispatch = useDispatch();
  const [activeItem, setActiveItem] = useState("home");
  return (
    <div className="h-full w-full border-r-2 border-current">
      <ul className="h-full flex flex-col justify-between p-3 text-sm font-bold xs:text-center max-h-[90%]">
        <Link to={"/admin"}>
          <li className="text-3xl flex justify-center sm:flex-none sm:justify-normal">
            <span className="sm:hidden">
              <Logo />
            </span>
            <span className="sm:flex hidden">ℒ𝑒𝓃𝓈ℒ𝑜𝑜𝓅</span>
          </li>
        </Link>
        <span className="sm:text-xl text-md font-sans">ADMIN</span>
        <Link to={`/admin`}>
          <li
            className="flex gap-5 items-center justify-center sm:justify-normal"
            onClick={() => setActiveItem("home")}
          >
            <FiUsers size={30} color="current" />
            <span
              className={`sm:flex hidden ${
                activeItem === "home" ? "text-lg" : ""
              }`}
            >
              USERS
            </span>
          </li>
        </Link>
        {/* <Link to={""}>
          <li
            className="flex gap-5 items-center justify-center sm:justify-normal"
            onClick={() => setActiveItem("search")}
          >
            <FiUsers size={30} color="current" />
            <span
              className={`sm:flex hidden ${
                activeItem === "search" ? "text-lg" : ""
              }`}
            >
              USERS
            </span>
          </li>
        </Link> */}
        <Link to={"/admin/posts"}>
          <li
            className="flex gap-5 items-center justify-center sm:justify-normal"
            onClick={() => setActiveItem("explore")}
          >
            <MdOutlinePhotoSizeSelectActual size={30} color="current" />
            <span
              className={`sm:flex hidden ${
                activeItem === "explore" ? "text-lg" : ""
              }`}
            >
              POSTS
            </span>
          </li>
        </Link>
        <Link to={"/admin/ads"}>
          <li
            className="flex gap-5 items-center justify-center sm:justify-normal"
            onClick={() => setActiveItem("message")}
          >
            <BsCashStack size={30} color="current" />
            <span
              className={`sm:flex hidden ${
                activeItem === "message" ? "text-lg" : ""
              }`}
            >
              ADS
            </span>
          </li>
        </Link>
        <Link to={""} onClick={() => dispatch(removeAdmin())}>
          <li
            className="flex gap-5 items-center justify-center sm:justify-normal"
            onClick={() => setActiveItem("message1")}
          >
            <FiLogOut size={30} color="current" />
            <span
              className={`sm:flex hidden ${
                activeItem === "message1" ? "text-lg" : ""
              }`}
            >
              LOGOUT
            </span>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default AdminNavBar;
