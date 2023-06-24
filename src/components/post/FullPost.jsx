import React, { useEffect, useState } from "react";
import ProfilePic from "../profile/mainComponents/ProfilePic";
import UserName from "../profile/mainComponents/UserName";
import Post from "./Post";
import Like from "./reactions/Like";
import Comment from "./reactions/Comment";
import Share from "./reactions/Share";
import Save from "./reactions/Save";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";

const FullPost = (props) => {
  let { postDetails, width, online } = props;
  if (!width) width = "400";
  const [liked, setLiked] = useState(false);
  useEffect(() => {}, []);

  return (
    <div className="card">
      <div className="flex justify-between items-center">
        <div className="mb-2 ml-4 flex gap-5 items-center">
          <ProfilePic
            dpUrl={postDetails?.userId?.profilePic}
            width="35"
            online={online}
          />
          <UserName username={postDetails?.userId?.username} />
        </div>
        <BsThreeDotsVertical className="mr-4 cursor-pointer" size={20} />
      </div>
      <span onDoubleClick={() => setLiked(true)} className="cursor-pointer">
        <Link to={`/posts/${postDetails?._id}`}>
          <Post w={width} imgUrl={postDetails?.image} />
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
      <div className="ml-4 my-1">{postDetails?.likes?.length} likes</div>
      <div className="ml-4 max-w-[23rem] leading-none">
        <UserName username={postDetails?.userId?.username} />
        <span className="font-sans text-sm ml-4">
          {postDetails?.description}
        </span>
      </div>
    </div>
  );
};

export default FullPost;
