import React from "react";
import { BsBookmarkPlus, BsBookmarkPlusFill } from "react-icons/bs";

const Save = ({saved}) => {
  return (
    <>
      <span className="cursor-pointer ">
        {saved ? (
          <span className="heart-animation">
            <BsBookmarkPlusFill color="green" size={25} />
          </span>
        ) : (
          <BsBookmarkPlus size={25} />
        )}
      </span>
    </>
  );
};

export default Save;
