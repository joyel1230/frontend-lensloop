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
import Logo from "../../micros/logo/Logo";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="h-full w-full border-r-2 border-current">
      <ul className="h-full flex flex-col justify-between p-3 text-sm font-bold xs:text-center max-h-[90%]">
        <Link to={"/"}>
          <li className="text-3xl">
            <span className="sm:hidden">
              <Logo />
            </span>
            <span className="sm:flex hidden">ℒ𝑒𝓃𝓈ℒ𝑜𝑜𝓅</span>
          </li>
        </Link>
        <Link to={"/userId"}>
          <li className="flex gap-5 items-center">
            <AiOutlineHome size={30} color="current" />
            <span className="sm:flex hidden">HOME</span>
          </li>
        </Link>
        <Link to={""}>
        <li className="flex gap-5 items-center">
          <AiOutlineSearch size={30} color="current" />
          <span className="sm:flex hidden">SEARCH</span>
        </li>
        </Link>
        <Link to={""}>
        <li className="flex gap-5 items-center">
          <MdOutlineExplore size={30} color="current" />
          <span className="sm:flex hidden">EXPLORE</span>
        </li>
        </Link>
        <Link to={""}>
        <li className="flex gap-5 items-center">
          <AiOutlineMessage size={30} color="current" />
          <span className="sm:flex hidden">MESSAGE</span>
        </li>
        </Link>
        <Link to={""}>
        <li className="flex gap-5 items-center">
          <AiOutlineHeart size={30} color="current" />
          <span className="sm:flex hidden">NOTIFICATION</span>
        </li>
        </Link>
        <Link to={""}>
        <li className="flex gap-5 items-center">
          <AiOutlinePlusCircle size={30} color="current" />
          <span className="sm:flex hidden">NEW POST</span>
        </li>
        </Link>
        <Link to={"/userId/profile"}>
          <li className="flex gap-5 items-center">
            <CgProfile size={30} color="current" />
            <span className="sm:flex hidden">PROFILE</span>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default NavBar;
