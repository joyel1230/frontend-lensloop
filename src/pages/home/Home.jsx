import React, { useEffect, useRef, useState } from "react";
import FullPost from "../../components/post/FullPost";
import Loading from "../../components/loading/Loading";
import { getAllPosts, getFollow } from "../../services/apiMethods";
import { GetUsernameFromRedux } from "../../utils/userInRedux";

const Home = () => {
  const sectionRef = useRef(null);
  const [load, setload] = useState(true);
  const [posts, setPosts] = useState([]);
  const [following, setFollowing] = useState([]);
  const userDetails = GetUsernameFromRedux();
  useEffect(() => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
    const data = {
      params: {
        userId: userDetails._id,
      },
    };
    getFollow(data)
      .then((resp) => {
        setFollowing(resp.data?.users[0]?.following);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [userDetails._id]);
  useEffect(() => {
    getAllPosts()
      .then((response) => {
        console.log(following);
        const filteredPosts = response?.data.filter(
          (post) =>
            following.includes(post.userId._id) ||
            post.userId._id === userDetails._id
        );
        setPosts(filteredPosts);
        setTimeout(() => {
          setload(false);
        }, 1000);
      })
      .catch((e) => {
        setTimeout(() => {}, 1000);
        console.log(e);
      });
  }, [following, userDetails._id]);

  return (
    <div className="container" ref={sectionRef}>
      {load && <Loading bg={true} />}
      <div className="cards flex flex-wrap gap-10 justify-center">
        {posts.length!==0 ?
        posts.map((post1, index, array) => {
          const post = array[array.length - 1 - index];
          return (
            <div className="w-full flex justify-center" key={post._id}>
              <FullPost postDetails={post} online={false} width="600" />
            </div>
          );
        }):<p className="flex justify-center items-center h-screen">No posts for you</p>}
      </div>
    </div>
  );
};

export default Home;
