import React from "react";
import { useParams } from "react-router-dom";
import FullPost from "../../components/post/FullPost";

const Home = () => {
  const {username}= useParams()
  return (
    <div className="container">
      <div className="cards flex flex-wrap gap-10 justify-center">
        {Array(10)
          .fill()
          .map((element) => {
            return (
              <FullPost userId={username}/>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
