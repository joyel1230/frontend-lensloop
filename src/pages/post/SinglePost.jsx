import React, { useEffect, useState } from "react";
import FullPost from "../../components/post/FullPost";
import Back from "../../components/micros/Back";
import { useParams } from "react-router-dom";
import { getSinglePost } from "../../services/apiMethods";
import Loading from "../../components/loading/Loading";

const SinglePost = () => {
  const post = useParams();
  const [postData, setPostData] = useState(null);
  useEffect(() => {
    getSinglePost(post)
      .then((res) => {
        setPostData(res.data[0]);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [post]);

  return (
    <>
      {postData ? (
        <>
          <Back />
          <div className="flex justify-center mt-5">
            <FullPost
              postDetails={postData}
              online={false}
              key={postData?._id}
              width="600"
            />
          </div>
        </>
      ) : (
        <Loading bg={true}/>
      )}
    </>
  );
};

export default SinglePost;
