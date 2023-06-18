import React, { useState } from "react";
import ProfilePic from "./ProfilePic";
import UserName from "./UserName";
import { Link } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import Settings from "./Settings";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";

const ProfileTopDiv = () => {
  const userToken = useSelector((state) => state?.user?.userData);
  let user;
  if (userToken) {
    user = jwt_decode(userToken);
  }
  const username = user?.username;
  const [settingsToggle, setSettingsToggle] = useState(false);
  return (
    <>
      <div className="flex justify-center">
        <ProfilePic
          width="100"
          dpUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL-L1UhpS9glJRsLpcu8L2COL88RL9e_JIZw&usqp=CAU"
        />
      </div>
      <div className="flex flex-col justify-between sm:ml-5 mt-5 sm:mt-0">
        <div>
          <div className="flex items-center justify-between">
            <UserName username={username} size="sm:text-3xl text-2xl" />
            <span
              className="cursor-pointer"
              onClick={() => setSettingsToggle(!settingsToggle)}
            >
              <IoSettingsOutline size={25} />
            </span>
          </div>
          <div className="flex justify-between text-md mt-8 sm:text-xl gap-5 select-none">
            <h1>{2} posts</h1>
            <Link to={`/${username}/followers`}>
              <h1>{6} followers</h1>
            </Link>
            <Link to={`/${username}/following`}>
              <h1>{8} following</h1>
            </Link>
          </div>
        </div>

        {settingsToggle && (
          <span className="pt-10">
            <Settings />
          </span>
        )}
      </div>
    </>
  );
};

export default ProfileTopDiv;
