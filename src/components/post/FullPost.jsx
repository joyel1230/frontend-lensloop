import React from "react";
import ProfilePic from "../profile/ProfilePic";
import UserName from "../profile/UserName";
import Post from "./Post";
import Like from "./reactions/Like";
import Comment from "./reactions/Comment";
import Share from "./reactions/Share";
import Save from "./reactions/Save";

const FullPost = (props) => {
  const { userId } = props;
  return (
    <div className="card">
      <div className="mb-2 ml-4 flex gap-5 items-center">
        <ProfilePic
          dpUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL-L1UhpS9glJRsLpcu8L2COL88RL9e_JIZw&usqp=CAU"
          width="35"
        />
        <UserName username={userId} />
      </div>
      <Post w="400" />
      <div className="mt-2 flex justify-between mx-4">
        <div className="flex justify-between gap-3">
          <Like />
          <Comment />
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
