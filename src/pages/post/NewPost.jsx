import React, { useRef } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Button from "../../components/micros/Button";
import { useState } from "react";
import CropImage from "../../components/profile/options/CropImage";
import { uplaodToCloudinary } from "../../hooks/cloudinary";
import { GetUsernameFromRedux } from "../../utils/userInRedux";
import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../components/loading/Loading";
import { postUpload } from "../../services/apiMethods";
import { useNavigate } from "react-router-dom";

const NewPost = () => {
  const userDetails = GetUsernameFromRedux();
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState("");
  const [description, setDescription] = useState("");
  const imgInput = useRef("");
  const [imgSelected, setimgSelected] = useState(false);
  const [croppedImg, setCroppedImg] = useState(null);
  const navigate = useNavigate()

  const notify = () => toast.success("Uploaded Successfully");
  const handleImage = (e) => {
    const file = e.target.files[0];
    try {
      setError("");
      setImage(URL.createObjectURL(file));
      setimgSelected(true);
    } catch (error) {}
  };

  const handleSubmit = async () => {
    try {
      if (croppedImg === null) {
        setError("Photo not selected...");
      } else if (description.length > 100) {
        setError("Maximum 100 characters of description");
      } else {
        setError('')
        setShow(" ");
        const imageObj = await uplaodToCloudinary(croppedImg, "lensloopPost");
        const imgUrl = imageObj?.url;
        const data = {
          userId: userDetails?._id,
          image: imgUrl,
          description: description,
        };
        const response = await postUpload(data)
        console.log(response.data)
        navigate('/')
        notify();
        setCroppedImg(null);
        setDescription('')
        setShow(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {imgSelected ? (
        <CropImage
          imgUrl={image}
          aspectInit={{ value: 16 / 9 }}
          setCroppedImg={setCroppedImg}
          setimgSelected={setimgSelected}
          setErr={setError}
        />
      ) : null}
      <div className="container sm:px-10 px-0">
        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          transition={Flip}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="border-b-2 border-t-2 border-current w-full py-3">
          <h1 className="underline text-3xl">New Post</h1>
        </div>
        <div className="flex-col flex items-center justify-between pt-10">
          <div
            className="relative cursor-pointer border-current border-2 rounded-md overflow-hidden  w-[23.95rem] h-[13.6rem] mt-3"
            onClick={() => imgInput.current.click()}
          >
            <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <AiOutlinePlus size={40} color="white" />
            </span>
            <img src={croppedImg} alt="" />
            <input
              type="file"
              accept="image/jpeg, image/png, image/webp"
              ref={imgInput}
              onChange={handleImage}
              className="cursor-pointer hidden"
            />
          </div>
          <div className="pt-8 pb-5 w-full flex justify-center">
            <div className="flex-col flex sm:w-[80%] w-[100%]">
              <label htmlFor="" className="text-lg">
                Description
              </label>
              <input
                type="text"
                value={description}
                className="w-full outline-none focus:outline-none bg-transparent px-5 border-current border-2 h-10 rounded-lg"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <span className="text-sm text-red-500">{error}</span>
          <div className="w-[80%]">
            {show && (
              <Loading bg={'none'}/>
            )}
              <span
                className="cursor-pointer flex justify-end"
                onClick={handleSubmit}
              >
                <Button
                  title="Post"
                  clr="bg-transparent border-2 text-current border-current px-5 py-2"
                />
              </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewPost;
