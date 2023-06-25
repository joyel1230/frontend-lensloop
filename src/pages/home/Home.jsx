import React, { useEffect, useRef, useState } from "react";
import { apiCall } from "../../services/apiCalls";
import { postUrls } from "../../const/routesPath";
import FullPost from "../../components/post/FullPost";
import Loading from "../../components/loading/Loading";
// import FullPost from "../../components/post/FullPost";
// import { GetUsernameFromRedux } from "../../utils/userInRedux";

const Home = () => {
  const sectionRef = useRef(null);
  const [load, setload] = useState(true);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
    apiCall("get", postUrls.posts)
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
        {posts.map((post, i) => {
          return (
            <div className="w-full flex justify-center" key={i}>
              <FullPost postDetails={post} width="600" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
