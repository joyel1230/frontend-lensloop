import React, { useEffect, useState } from "react";
import { apiCall } from "../../services/apiCalls";
import { postUrls } from "../../const/routesPath";
import Loading from "../../components/loading/Loading";
import { Link } from "react-router-dom";

const Explore = () => {
  const [load, setload] = useState(true);
  const [posts, setPosts] = useState();
  useEffect(() => {
    apiCall("get", postUrls.posts, {})
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
    <div className="w-full px-2 py-4 ">
      {load ? (
        <Loading />
      ) : (
        <div className="flex flex-wrap gap-5 justify-center">
          {posts.map((post, index, array) => {
            const post2 = array[array.length - 1 - index];
            return (
              <Link to={`/posts/${post2?._id}`} key={post2._id}>
                <img src={post2?.image} width={400} alt="" />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Explore;
