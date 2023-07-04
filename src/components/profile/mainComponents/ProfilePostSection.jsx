/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import FullPost from "../../post/FullPost";
import { useDispatch } from "react-redux";
import { setUserPosts } from "../../../utils/reduxSlices/userPost";
import ProfileBar from "../options/ProfileBar";
import { Link } from "react-router-dom";
import { getAds, getSavedPost, getUserPost } from "../../../services/apiMethods";

const ProfilePostSection = ({ userId, isUser, setCount }) => {
  const dispatch = useDispatch();
  const [load, setload] = useState(true);
  const [page, setPage] = useState("");
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const data = { params: { userId: userId } };
    if (page === "saved") {
      getSavedPost(data)
        .then((response) => {
          setPosts(response.data);
          dispatch(setUserPosts(response.data));
        })
        .catch((e) => {
          console.log(e);
        });
    } else if (page === "ads") {
      getAds(data)
        .then((response) => {
          setPosts(response.data);
          dispatch(setUserPosts(response.data));
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      getUserPost(data)
        .then((response) => {
          setCount(response.data?.length);
          setPosts(response.data);
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
      <ProfileBar load={load} change={setPage} user={isUser} />
      <div className="cards flex flex-wrap gap-10 justify-center select-none">
        {posts.map((post, index, array) => {
          const post2 = array[array.length - 1 - index];
          return page === "saved" ? (
            <Link to={`/posts/${post2?._id}`} key={post2._id}>
              <img src={post2?.image} width={400} alt="" />
            </Link>
          ) : (
            <FullPost
              profile={true}
              postDetails={post2}
              online={false}
              key={post2?._id}
            />
          );
        })}
      </div>
    </>
  );
};

export default ProfilePostSection;
