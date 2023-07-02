import React from "react";
import { Link } from "react-router-dom";

const ProfilePic = (props) => {
  const { dpUrl, width, online = true,username } = props;
  return (
    <>
      <Link to={`/${username}`} className="relative h-fit">
        {online && (
          <span className=" bg-green-500 rounded-full bottom-0 left-[1.7rem] border-2 border-transparent w-[0.7rem] h-[0.7rem] absolute"></span>
        )}
        <img src={dpUrl} width={width} alt="" className="rounded-full" />
      </Link>
    </>
  );
};

export default ProfilePic;
