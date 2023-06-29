import React, { useState } from "react";
import { AiOutlineComment } from "react-icons/ai";
import CommentScreen from "../Comment";

function Comment({postDetails}) {
  const [showBox, setShowBox] = useState(false)
  return (
    <>
    {showBox && <CommentScreen show={setShowBox} post={postDetails}/>}
      <span className="cursor-pointer" onClick={()=>setShowBox(true)}>
        <AiOutlineComment size={25} />
      </span>
    </>
  );
}

export default Comment;
