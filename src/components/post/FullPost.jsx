import React, { useState } from "react";
import ProfilePic from "../profile/ProfilePic";
import UserName from "../profile/UserName";
import Post from "./Post";
import Like from "./reactions/Like";
import Comment from "./reactions/Comment";
import Share from "./reactions/Share";
import Save from "./reactions/Save";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";

const FullPost = (props) => {
  let { userId, width,url, online } = props;
  if (!width) width = "400";
  const [liked, setLiked] = useState(false);
  return (
    <div className="card">
      <div className="flex justify-between items-center">
        <div className="mb-2 ml-4 flex gap-5 items-center">
          <ProfilePic
            dpUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL-L1UhpS9glJRsLpcu8L2COL88RL9e_JIZw&usqp=CAU"
            width="35"
            online={online}
          />
          <UserName username={userId} />
        </div>
        <BsThreeDotsVertical className="mr-4 cursor-pointer" size={20} />
      </div>
      <span onDoubleClick={() => setLiked(true)} className="cursor-pointer">
        <Link to={url}>
          <Post w={width} />
        </Link>
      </span>
      <div className="mt-2 flex justify-between mx-4">
        <div className="flex justify-between gap-3 relative">
          <span onClick={() => setLiked(!liked)} className="absolute">
            <Like liked={liked} />
          </span>
          <span className="ms-10">
            <Comment />
          </span>
          <Share />
        </div>
        <div>
          <Save />
        </div>
      </div>
      <div className="ml-4 my-1">{243} likes</div>
      <div className="ml-4 max-w-[23rem] leading-none">
        <UserName username={userId} />
        <span className="font-sans text-sm ml-4">
          {
            "Lorem ipsum dolor sit amet. ipsum dolor sit amet. ipsum dolor sit amet."
          }
        </span>
      </div>
    </div>
  );
};

export default FullPost;
