import React from "react";
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
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";

const NavBar = () => {
  const userStore = useSelector((state) => state?.user);
  let userDetails;
  if (userStore.userData) {
    userDetails = jwt_decode(userStore?.userData);
  }
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
          <li className="flex gap-5 items-center justify-center sm:justify-normal">
            <AiOutlineHome size={30} color="current" />
            <span className="sm:flex hidden">HOME</span>
          </li>
        </Link>
        <Link to={""}>
          <li className="flex gap-5 items-center justify-center sm:justify-normal">
            <AiOutlineSearch size={30} color="current" />
            <span className="sm:flex hidden">SEARCH</span>
          </li>
        </Link>
        <Link to={""}>
          <li className="flex gap-5 items-center justify-center sm:justify-normal">
            <MdOutlineExplore size={30} color="current" />
            <span className="sm:flex hidden">EXPLORE</span>
          </li>
        </Link>
        <Link to={""}>
          <li className="flex gap-5 items-center justify-center sm:justify-normal">
            <AiOutlineMessage size={30} color="current" />
            <span className="sm:flex hidden">MESSAGE</span>
          </li>
        </Link>
        <Link to={""}>
          <li className="flex gap-5 items-center justify-center sm:justify-normal">
            <AiOutlineHeart size={30} color="current" />
            <span className="sm:flex hidden">NOTIFICATION</span>
          </li>
        </Link>
        <Link to={""}>
          <li className="flex gap-5 items-center justify-center sm:justify-normal">
            <AiOutlinePlusCircle size={30} color="current" />
            <span className="sm:flex hidden">NEW POST</span>
          </li>
        </Link>
        <Link to={`/${username}`}>
          <li className="flex gap-5 items-center justify-center sm:justify-normal">
            <CgProfile size={30} color="current" />
            <span className="sm:flex hidden">PROFILE</span>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default NavBar;
