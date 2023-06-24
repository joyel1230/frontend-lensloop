/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import FullPost from "../../post/FullPost";
import { apiCall } from "../../../services/apiCalls";
import { postUrls } from "../../../const/routesPath";
import { useDispatch, useSelector } from "react-redux";
import { setUserPosts } from "../../../utils/reduxSlices/userPost";
import Loading from "../../loading/Loading";

const ProfilePostSection = ({ userId, username }) => {
  const dispatch = useDispatch();
  const [load, setload] = useState(true);
  const posts = useSelector((state) => state?.userPost?.userPostsArray);
  useEffect(() => {
    const data = { params: { userId: userId } };
    apiCall("get", postUrls.posts, data)
      .then((response) => {
        dispatch(setUserPosts(response.data));
        setTimeout(() => {
          setload(false);
        }, 1000);
      })
      .catch((e) => {
        setTimeout(() => {
          setload(false);
        }, 1000);
        console.log(e);
      });
  }, [userId]);
  return (
    <>
      <div className="px-1 sm:w-[85%] sm:mx-auto  select-none">
        {load && <Loading bg={"none"} />}
        <div className="flex justify-between my-2 text-lg sm:text-2xl border-b-2 border-t-2 border-current py-3">
          <div className="flex items-center gap-4">
            <h1 className="cursor-pointer">Posts</h1>
            <Link to={`/new-post`}>
              <AiOutlinePlusCircle />
            </Link>
          </div>
          <div>
            <h1 className="cursor-pointer">Saved</h1>
          </div>
          <div className="flex items-center gap-4">
            <h1 className="cursor-pointer">ADS</h1>
            <Link to={`/ad-post`}>
              <AiOutlinePlusCircle />
            </Link>
          </div>
        </div>
      </div>
      <div className="cards flex flex-wrap gap-10 justify-center select-none">
        {posts.map((post, index, array) => {
          const post2 = array[array.length - 1 - index];
          return (
            <FullPost postDetails={post2} online={false} key={post2?._id} />
          );
        })}
      </div>
    </>
  );
};

export default ProfilePostSection;
