import React from "react";
import ProfilePic from "../../components/profile/ProfilePic";
import UserName from "../../components/profile/UserName";
import { FiEdit } from "react-icons/fi";
import Button from "../../components/micros/button/Button";
import { Link } from "react-router-dom";

const ProfileTopDiv = (props) => {
  const { username } = props;
  return (
    <>
      <div className="flex justify-center">
        <ProfilePic
          width="100"
          dpUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL-L1UhpS9glJRsLpcu8L2COL88RL9e_JIZw&usqp=CAU"
        />
      </div>
      <div className="flex flex-col justify-between sm:ml-5 mt-5 sm:mt-0">
        <div className="flex items-center justify-between">
          <UserName username={username} size="sm:text-3xl text-2xl" />
          <Link to={`/${username}/edit-profile`}>
            <FiEdit size={30} />
          </Link>
          <span className="cursor-pointer">
            <Button title="Logout" clr="" />
          </span>
        </div>
        <div className="flex  justify-between text-md sm:text-xl gap-5">
          <h1>{2} posts</h1>
          <Link to={`/${username}/followers`}>
          <h1>{6} followers</h1>
          </Link>
          <Link to={`/${username}/following`}>
          <h1>{8} following</h1>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProfileTopDiv;
