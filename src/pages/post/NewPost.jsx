import React, { useRef } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Button from "../../components/micros/Button";
import { useState } from "react";

const NewPost = () => {
  const [image, setImage] = useState("");
  const imgInput = useRef("");
  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
  };
  return (
    <div className="container sm:px-10 px-0">
      <div className="border-b-2 border-t-2 border-current w-full py-3">
        <h1 className="underline text-3xl">New Post</h1>
      </div>
      <div className="flex-col flex items-center justify-between pt-10">
        <div
          className="relative cursor-pointer border-current border-2 rounded-md overflow-hidden w-72 h-48 mt-3"
          onClick={() => imgInput.current.click()}
        >
          <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <AiOutlinePlus size={40} color="white"/>
          </span>
          <img src={image} alt="" width={300} />
          <input
            type="file"
            accept="image/jpeg, image/png"
            ref={imgInput}
            onChange={handleImage}
            className="cursor-pointer hidden"
          />
        </div>
        <div className="py-8 w-full flex justify-center">
          <div className="flex-col flex sm:w-[80%] w-[100%]">
            <label htmlFor="" className="text-lg">
              Description
            </label>
            <input
              type="text"
              className="w-full outline-none focus:outline-none bg-transparent px-5 border-current border-2 h-10 rounded-lg"
            />
          </div>
        </div>
        <span className="cursor-pointer flex justify-end w-[80%]">
          <Button
            title="Post"
            clr="bg-transparent border-2 text-current border-current px-5 py-2"
          />
        </span>
      </div>
    </div>
  );
};

export default NewPost;
