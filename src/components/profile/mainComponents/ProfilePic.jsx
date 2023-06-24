import React from "react";
import { Link } from "react-router-dom";

const ProfilePic = (props) => {
  const { dpUrl, width, online = true } = props;
  return (
    <>
      <Link to={""} className="relative ">
        {online && (
          <span className=" bg-green-500 rounded-full bottom-0 left-[1.7rem] border-2 border-black w-[0.7rem] h-[0.7rem] absolute"></span>
        )}
        <img src={dpUrl} width={width} alt="" className="rounded-full" />
      </Link>
    </>
  );
};

export default ProfilePic;
