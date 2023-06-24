import React from "react";

const Post = (props) => {
  const { w } = props;
  return (
    <>
      <img
        src={props?.imgUrl ?? 'https://joseluisjoyero.es/wp-content/uploads/2017/06/wood-blog-placeholder.jpg'}
        width={w}
        alt=""
      />
    </>
  );
};

export default Post;
