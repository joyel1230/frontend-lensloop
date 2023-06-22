import React, { useState } from "react";
import Back from "../../micros/Back";
import { Link } from "react-router-dom";
import { GetUsernameFromRedux } from "../../../utils/userInRedux";
import Button from "../../micros/Button";
import { apiCall } from "../../../services/apiCalls";
import { userUrls } from "../../../const/routesPath";

import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangePass = () => {
  const userDetails = GetUsernameFromRedux();
  const [error, setError] = useState([]);
  const [passwords, setPasswords] = useState({ newPass: "", confirmPass: "" });

  const notify = () => toast.success("Updated Successfully");
  const handleSubmit = async () => {
    const { newPass, confirmPass } = passwords;
    if (newPass.length < 4) {
      setError(["need 4 or more characters", ""]);
    } else if (newPass !== confirmPass) {
      setError(["", "passwords are not same"]);
    } else {
      try {
        const data = { newPass: newPass };
        setError([' ']);
        await apiCall(
          "patch",
          `${userUrls.usersChangePass}/${userDetails.username}`,
          data
        );
        setPasswords({ newPass: "", confirmPass: "" })
        notify();
        setError([]);
      } catch (error) {}
    }
  };
  return (
    <>
      <span className="ms-5">
        <Link to={`../${userDetails?.username}`}>
          <Back />
        </Link>
      </span>
      <div className="px-1 sm:w-[85%] sm:mx-auto">
        <div className="flex justify-between my-2 text-lg sm:text-2xl border-b-2 border-t-2 border-current py-3">
          <div className="flex items-center gap-4">
            <Link to={`../${userDetails?.username}/edit-profile`}>
              <h1 className="cursor-pointer">Edit Profile</h1>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <h1 className="cursor-pointer underline">Change Password</h1>
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
      <div className="px-1 sm:w-[85%] sm:mx-auto mt-40">
        <div className="w-[70%] mt-16 flex justify-between text-xl flex-wrap gap-5">
          <div className="flex flex-col">
            <label htmlFor="">New Password</label>
            <input
              type="text"
              className="bg-transparent border-b-2 focus:outline-none"
              value={passwords.newPass}
              onChange={(e) => {
                setPasswords({ ...passwords, newPass: e.target.value });
                setError([]);
              }}
            />
            <span className="text-red-500 text-sm w-44">{error[0]}</span>
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Confirm Password</label>
            <input
              type="text"
              className="bg-transparent border-b-2 focus:outline-none"
              value={passwords.confirmPass}
              onChange={(e) => {
                setPasswords({ ...passwords, confirmPass: e.target.value });
                setError([]);
              }}
            />
            <span className="text-red-500 text-sm w-44">{error[1]}</span>
          </div>
        </div>
        <div className="flex justify-end">
          {error.length !== 0 ? (
            <Button title="Update" clr="h-fit w-fit pointer-events-none" />
          ) : (
            <span onClick={handleSubmit}>
              <Button title="Update" clr="h-fit w-fit" />
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default ChangePass;
