import React from "react";
import FullPost from "../../components/post/FullPost";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";

const Home = () => {
  // const { username } = useParams();
  const userToken = useSelector((state) => state?.user?.userData);
  let user;
  if (userToken) {
    user = jwt_decode(userToken);
  }
  const username = user?.username;
  return (
    <div className="container">
      <div className="cards flex flex-wrap gap-10 justify-center">
        {Array(10)
          .fill()
          .map((element, i) => {
            return (
              <div className="w-full flex justify-center" key={i}>
                <FullPost userId={username} width="600"/>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
