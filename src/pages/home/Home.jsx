import React, { useEffect, useRef } from "react";
// import FullPost from "../../components/post/FullPost";
// import { GetUsernameFromRedux } from "../../utils/userInRedux";


const Home = () => {
  // const userDetails = GetUsernameFromRedux()
  // const username = userDetails?.username;
  const sectionRef = useRef(null);
  useEffect(() => {
    sectionRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [])

  return (
    <div className="container" ref={sectionRef}>
      <div className="cards flex flex-wrap gap-10 justify-center">
        {/* {Array(10)
          .fill()
          .map((element, i) => {
            return (
              <div className="w-full flex justify-center" key={i}>
                <FullPost userId={username} width="600"/>
              </div>
            );
          })} */}
      </div>
    </div>
  );
};

export default Home;
