import React, { useEffect, useState } from "react";
import FullPost from "../../components/post/FullPost";
import Back from "../../components/micros/Back";
import { useParams } from "react-router-dom";
import { apiCall } from "../../services/apiCalls";
import { postUrls } from "../../const/routesPath";

const SinglePost = () => {
  const post = useParams();
  const [postData, setPostData] = useState({});
  useEffect(() => {
    apiCall("get", `${postUrls.posts}/${post?.id}`, {})
      .then((res) => {
        setPostData(res.data[0]);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [post?.id]);

  return (
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
  );
};

export default SinglePost;
