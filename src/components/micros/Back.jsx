import React from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Back = () => {
  const navigate = useNavigate()
  return (
    <span onClick={()=>navigate(-1)} className="cursor-pointer w-auto">
        <IoArrowBackCircle size={35}/>
    </span>
  );
};

export default Back;
