import React, { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineMessage,
  AiOutlineHeart,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { MdOutlineExplore } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import Logo from "../../micros/Logo";
import { Link } from "react-router-dom";
import { GetUsernameFromRedux } from "../../../utils/userInRedux";

const NavBar = () => {
  const userDetails = GetUsernameFromRedux();
  const [activeItem, setActiveItem] = useState("home");
  const username = userDetails?.username;
  return (
    <div className="h-full w-full border-r-2 border-current">
      <ul className="h-full flex flex-col justify-between p-3 text-sm font-bold xs:text-center max-h-[90%]">
        <Link to={"/"}>
          <li className="text-3xl flex justify-center sm:flex-none sm:justify-normal">
            <span className="sm:hidden">
              <Logo />
            </span>
            <span className="sm:flex hidden">ℒ𝑒𝓃𝓈ℒ𝑜𝑜𝓅</span>
          </li>
        </Link>
        <Link to={`/`}>
          <li
            className="flex gap-5 items-center justify-center sm:justify-normal"
            onClick={() => setActiveItem("home")}
          >
            <AiOutlineHome size={30} color="current" />
            <span
              className={`sm:flex hidden ${
                activeItem === "home" ? "text-lg" : ""
              }`}
            >
              HOME
            </span>
          </li>
        </Link>
        <Link to={""}>
          <li
            className="flex gap-5 items-center justify-center sm:justify-normal"
            onClick={() => setActiveItem("search")}
          >
            <AiOutlineSearch size={30} color="current" />
            <span
              className={`sm:flex hidden ${
                activeItem === "search" ? "text-lg" : ""
              }`}
            >
              SEARCH
            </span>
          </li>
        </Link>
        <Link to={""}>
          <li
            className="flex gap-5 items-center justify-center sm:justify-normal"
            onClick={() => setActiveItem("explore")}
          >
            <MdOutlineExplore size={30} color="current" />
            <span
              className={`sm:flex hidden ${
                activeItem === "explore" ? "text-lg" : ""
              }`}
            >
              EXPLORE
            </span>
          </li>
        </Link>
        <Link to={""}>
          <li
            className="flex gap-5 items-center justify-center sm:justify-normal"
            onClick={() => setActiveItem("message")}
          >
            <AiOutlineMessage size={30} color="current" />
            <span
              className={`sm:flex hidden ${
                activeItem === "message" ? "text-lg" : ""
              }`}
            >
              MESSAGE
            </span>
          </li>
        </Link>
        <Link to={""}>
          <li
            className="flex gap-5 items-center justify-center sm:justify-normal"
            onClick={() => setActiveItem("notification")}
          >
            <AiOutlineHeart size={30} color="current" />
            <span
              className={`sm:flex hidden ${
                activeItem === "notification" ? "text-lg" : ""
              }`}
            >
              NOTIFICATION
            </span>
          </li>
        </Link>
        <Link to={""}>
          <li
            className="flex gap-5 items-center justify-center sm:justify-normal"
            onClick={() => setActiveItem("newpost")}
          >
            <AiOutlinePlusCircle size={30} color="current" />
            <span
              className={`sm:flex hidden ${
                activeItem === "newpost" ? "text-lg" : ""
              }`}
            >
              NEW POST
            </span>
          </li>
        </Link>
        <Link to={`/${username}`}>
          <li
            className="flex gap-5 items-center justify-center sm:justify-normal"
            onClick={() => setActiveItem("profile")}
          >
            <CgProfile size={30} color="current" />
            <span
              className={`sm:flex hidden ${
                activeItem === "profile" ? "text-lg" : ""
              }`}
            >
              PROFILE
            </span>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default NavBar;
