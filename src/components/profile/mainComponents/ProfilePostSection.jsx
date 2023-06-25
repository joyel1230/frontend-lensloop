/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import FullPost from "../../post/FullPost";
import { apiCall } from "../../../services/apiCalls";
import { postUrls } from "../../../const/routesPath";
import { useDispatch, useSelector } from "react-redux";
import { setUserPosts } from "../../../utils/reduxSlices/userPost";
import ProfileBar from "../options/ProfileBar";
import { Link } from "react-router-dom";

const ProfilePostSection = ({ userId }) => {
  const dispatch = useDispatch();
  const [load, setload] = useState(true);
  const [page, setPage] = useState("");
  const posts = useSelector((state) => state?.userPost?.userPostsArray);
  useEffect(() => {
    const data = { params: { userId: userId } };
    if (page === "saved") {
      apiCall("get", postUrls.postsSave, { params: { userId: userId } })
        .then((response) => {
          console.log(response.data);
          dispatch(setUserPosts(response.data));
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
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
    }
  }, [userId, page]);

  return (
    <>
      <ProfileBar load={load} change={setPage} />
      <div className="cards flex flex-wrap gap-10 justify-center select-none">
        {posts.map((post, index, array) => {
          const post2 = array[array.length - 1 - index];
          return page === "saved" ? (
            <Link to={`/posts/${post2?._id}`} key={post2._id}>
              <img src={post2?.image} width={400} alt="" />
            </Link>
          ) : (
            <FullPost postDetails={post2} online={false} key={post2?._id} />
          );
        })}
      </div>
    </>
  );
};

export default ProfilePostSection;
