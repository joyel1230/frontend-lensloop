import React, { useEffect, useRef, useState } from "react";
import FullPost from "../../components/post/FullPost";
import Loading from "../../components/loading/Loading";
import { getAllPosts } from "../../services/apiMethods";

const Home = () => {
  const sectionRef = useRef(null);
  const [load, setload] = useState(true);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
    getAllPosts()
      .then((response) => {
        setPosts(response?.data);
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
  }, []);
  return (
    <div className="container" ref={sectionRef}>
      {load && <Loading bg={true} />}
      <div className="cards flex flex-wrap gap-10 justify-center">
        {posts.map((post1, index, array) => {
          const post = array[array.length - 1 - index];
          return (
            <div className="w-full flex justify-center" key={post._id}>
              <FullPost postDetails={post} online={false} width="600" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
