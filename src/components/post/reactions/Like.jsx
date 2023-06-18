import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const Like = (props) => {
  const { liked } = props;
  return (
    <>
      <span className="cursor-pointer ">
        {liked ? (
          <span className="heart-animation">
            <AiFillHeart color="red" size={25} />
          </span>
        ) : (
          <AiOutlineHeart size={25} />
        )}
      </span>
    </>
  );
};

export default Like;
