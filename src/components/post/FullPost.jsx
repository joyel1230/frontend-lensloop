import React, { useState } from "react";
import ProfilePic from "../profile/mainComponents/ProfilePic";
import UserName from "../profile/mainComponents/UserName";
import Post from "./Post";
import Like from "./reactions/Like";
import Comment from "./reactions/Comment";
import Share from "./reactions/Share";
import Save from "./reactions/Save";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import { GetUsernameFromRedux } from "../../utils/userInRedux";
import { apiCall } from "../../services/apiCalls";
import { postUrls } from "../../const/routesPath";

const FullPost = ({ postDetails, width, online, count = 1 }) => {
  const userDetails = GetUsernameFromRedux();
  if (!width) width = "400";
  let dp,
    desc = "";
  if (width === "600") {
    dp = "text-xl";
    desc = "text-lg";
  }
  const likeStatus = postDetails?.likes?.includes(userDetails?._id);
  const saveStatus = postDetails?.saved?.includes(userDetails?._id);
  const [liked, setLiked] = useState(likeStatus);
  const [likeCount, setLikeCount] = useState(postDetails?.likes?.length);
  const [saved, setSaved] = useState(saveStatus);
  const handleLikes = async (foo) => {
    const data = {
      postId: postDetails?._id,
      userId: userDetails?._id,
      value: foo,
    };
    try {
      setLiked(foo);
      if (foo) {
        setLikeCount(likeCount + 1);
      } else {
        if (likeCount !== 0) {
          setLikeCount(likeCount - 1);
        }
      }
      await apiCall("patch", postUrls.postsLike, data);
    } catch (error) {
      setLiked(!foo);
      console.log(error);
    }
  };
  const handleSave = async (foo) => {
    const data = {
      postId: postDetails?._id,
      userId: userDetails?._id,
      value: foo,
    };
    try {
      setSaved(foo);
      await apiCall("patch", postUrls.postsSave, data);
    } catch (error) {
      setSaved(!foo);
      console.log(error);
    }
  };

  const handleShare = (post) => {
    if (navigator.share) {
      navigator
        .share({
          url: '/posts/'+post._id,
        })
        .then(() => console.log("Share successful"))
        .catch((error) => console.log("Share failed", error));
    } else {
      console.log("Web Share API not supported");
    }
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center">
        <div className="mb-2 ml-4 flex gap-5 items-center">
          <ProfilePic
            dpUrl={postDetails?.userId?.profilePic}
            width="35"
            online={online}
          />
          <UserName size={dp} username={postDetails?.userId?.username} />
        </div>
        <BsThreeDotsVertical className="mr-4 cursor-pointer" size={20} />
      </div>
      <Link to={`/posts/${postDetails?._id}`}>
        <span
          onDoubleClick={() => handleLikes(!liked)}
          className="cursor-pointer"
        >
          <Post w={width} imgUrl={postDetails?.image} />
        </span>
      </Link>
      <div className="mt-2 flex justify-between mx-4">
        <div className="flex justify-between gap-3 relative">
          <span onClick={() => handleLikes(!liked)} className="absolute">
            <Like liked={liked} />
          </span>
          <span className="ms-10">
            <Comment />
          </span>
          <span onClick={() => handleShare(postDetails)}>
            <Share />
          </span>
        </div>
        <div onClick={() => handleSave(!saved)}>
          <Save saved={saved} />
        </div>
      </div>
      <div className="ml-4 my-1 select-none">{likeCount} likes</div>
      <div
        className={`ml-4 ${
          desc ? "max-w-[37rem]" : "max-w-[23rem]"
        }  leading-none`}
      >
        <UserName size={dp} username={postDetails?.userId?.username} />
        <span
          className={desc ? `font-sans ml-4 ${desc}` : `font-sans text-sm ml-4`}
        >
          {postDetails?.description}
        </span>
      </div>
    </div>
  );
};

export default FullPost;
