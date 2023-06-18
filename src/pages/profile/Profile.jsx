import React from "react";
import { Link, useParams } from "react-router-dom";
import FullPost from "../../components/post/FullPost";
import ProfileTopDiv from "../../components/profile/ProfileTopDiv";
import { AiOutlinePlusCircle } from "react-icons/ai";

const Profile = () => {
  const { username } = useParams();
  
  return (
    <div className="flex w-full flex-col justify-between gap-10">
      <div className="sm:flex w-full sm:justify-center mx-auto flex-none">
        <ProfileTopDiv username={username} />
      </div>
      <div className="px-1 sm:w-[85%] sm:mx-auto">
        <hr />
        <div className="flex justify-between my-2 text-lg sm:text-2xl">
          <div className="flex items-center gap-4">
            <h1 className="cursor-pointer">Posts</h1>
            <Link to={`/${username}/new-post`}>
              <AiOutlinePlusCircle />
            </Link>
          </div>
          <div>
            <h1 className="cursor-pointer">Saved</h1>
          </div>
          <div className="flex items-center gap-4">
            <h1 className="cursor-pointer">ADS</h1>
            <Link to={`/${username}/ad-post`}>
              <AiOutlinePlusCircle />
            </Link>
          </div>
        </div>
        <hr />
      </div>
      <div className="cards flex flex-wrap gap-10 justify-center">
        <FullPost userId={username} />
        <FullPost userId={username} />
        <FullPost userId={username} />
        <FullPost userId={username} />
      </div>
    </div>
  );
};

export default Profile;
