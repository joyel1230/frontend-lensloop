import React from "react";
import { Link } from "react-router-dom";

const ProfilePic = (props) => {
  const { dpUrl, width } = props;
  return (
    <>
      <Link to={""}>
        <img src={dpUrl} width={width} alt="" className="rounded-full" />
      </Link>
    </>
  );
};

export default ProfilePic;
