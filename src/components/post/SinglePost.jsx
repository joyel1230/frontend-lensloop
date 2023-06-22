import React from "react";
import FullPost from "./FullPost";
import Back from "../micros/Back";
import { Link } from "react-router-dom";

const SinglePost = () => {
  return (
    <>
      <Link to={'..'}>
        <Back />
      </Link>
      <div className="flex justify-center mt-5">
        <FullPost userId="joyel" width="600" />
      </div>
    </>
  );
};

export default SinglePost;
