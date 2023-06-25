import React, { useRef, useState } from "react";
import Back from "../../micros/Back";
import { Link } from "react-router-dom";
import { GetUsernameFromRedux } from "../../../utils/userInRedux";
import ProfilePic from "../mainComponents/ProfilePic";
import Button from "../../micros/Button";
import { apiCall } from "../../../services/apiCalls";
import { userUrls } from "../../../const/routesPath";
import { useDispatch } from "react-redux";
import { setEditedUser } from "../../../utils/reduxSlices/user";

import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CropImage from "./CropImage.jsx";
import { uplaodToCloudinary } from "../../../hooks/cloudinary";
import Loading from "../../loading/Loading";

const EditProfile = () => {
  const userDetails = GetUsernameFromRedux();
  const [proPic, setProPic] = useState(userDetails?.profilePic);
  const imgRef = useRef();
  const [error, setError] = useState(null);
  const [validUsername, setValidUsername] = useState(userDetails?.username);
  const [name, setName] = useState(userDetails?.name ?? "");
  const [username, setUsername] = useState(userDetails?.username);
  const [imgSelected, setimgSelected] = useState(false);
  const [croppedImg, setCroppedImg] = useState(userDetails?.profilePic);
  const dispatch = useDispatch();

  const notify = () => toast.success("Updated Successfully");
  const handleImage = (e) => {
    const file = e.target.files[0];
    setimgSelected(true);
    setProPic(URL.createObjectURL(file));
  };

  const handleUsername = async (e) => {
    let username = e.target.value.trim();
    setUsername(username);
    username = username.toLowerCase();
    const data = {
      params: { username },
    };
    const user = await apiCall("get", userUrls.users, data);
    if (!user.data && !username.includes(" ") && username.length > 3) {
      setError(null);
      setValidUsername(username);
    } else {
      if (username === userDetails.username) {
        setError(null);
        setValidUsername(username);
      } else {
        setValidUsername(null);
        if (username.includes(" ")) {
          setError("username can't contain space");
        } else if (username.length < 4) {
          setError("need 4 or more characters");
        } else {
          setError("username is already taken");
        }
      }
    }
  };

  const handleSubmit = async () => {
    try {
      setError(" ");
      let dpUrl;
      if (croppedImg === userDetails?.profilePic) {
        dpUrl = null;
      } else {
        const imageObj = await uplaodToCloudinary(croppedImg, "lensloopDp");
        dpUrl = imageObj?.url;
      }
      const data = {
        newName: name,
        newUsername: validUsername,
        newDpUrl: dpUrl,
      };
      const response = await apiCall(
        "patch",
        `${userUrls.usersEditProfile}/${userDetails.username}`,
        data
      );
      notify();
      setError("");
      const editedUserToken = response?.data?.token;
      dispatch(setEditedUser({ token: editedUserToken }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {imgSelected ? (
        <CropImage
          imgUrl={proPic}
          aspectInit={{ value: 1 / 1 }}
          setCroppedImg={setCroppedImg}
          setimgSelected={setimgSelected}
        />
      ) : null}
      <span className="ms-5">
        <Back />
      </span>
      <div className="px-1 sm:w-[85%] sm:mx-auto">
        <div className="flex justify-between my-2 text-lg sm:text-2xl border-b-2 border-t-2 border-current py-3">
          <div className="flex items-center gap-4">
            <h1 className="cursor-pointer underline">Edit Profile</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link to={`../${userDetails?.username}/change-password`}>
              <h1 className="cursor-pointer">Change Password</h1>
            </Link>
          </div>
        </div>
      </div>
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
      <div className="px-1 sm:w-[85%] sm:mx-auto mt-20">
        <div className="flex items-center gap-5">
          <div className="-z-10">
            <ProfilePic width="100" dpUrl={croppedImg} online={false} />
          </div>
          <span
            className="underline text-lg sm:text-2xl cursor-pointer"
            onClick={(e) => {
              imgRef.current.click();
              setCroppedImg(userDetails?.profilePic);
            }}
          >
            Change Profile Pic
          </span>
          <input
            ref={imgRef}
            type="file"
            accept="image/jpeg, image/png"
            className="hidden"
            onChange={handleImage}
          />
        </div>
        <div className="w-[70%] mt-16 flex justify-between text-xl flex-wrap gap-5">
          <div className="flex flex-col">
            <label htmlFor="">Name</label>
            <input
              type="text"
              value={name}
              className="bg-transparent border-b-2 focus:outline-none"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Username</label>
            <input
              type="text"
              value={username}
              className="bg-transparent border-b-2 focus:outline-none"
              onChange={handleUsername}
            />
            <span className="text-red-500 text-sm w-44">{error}</span>
          </div>
        </div>
        <div className="flex justify-end mt-3">
          {error && <Loading bg={"none"} />}
          <span onClick={handleSubmit}>
            <Button title="Update" clr="h-fit w-fit" />
          </span>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
