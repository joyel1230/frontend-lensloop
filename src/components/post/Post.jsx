import React from "react";

const Post = (props) => {
  const { w } = props;
  return (
    <>
      <img
        src="https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
        width={w}
        alt=""
      />
    </>
  );
};

export default Post;
