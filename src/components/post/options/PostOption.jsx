import React, { useState } from "react";
import { deletePost } from "../../../services/admin/apiMethods";
import { AiOutlineSend } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postReport } from "../../../services/apiMethods";

const PostOption = ({ show, user, post, userId }) => {
  const navigate = useNavigate();
  const [reason, setReason] = useState();
  const notify = () => toast.success("Reported Successfully");

  const handleDelete = async () => {
    const data = { postId: post._id, value: true };
    await deletePost(data);
    navigate(-1);
    show(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (reason === "" || reason.length > 50) {
      show(false);
      return;
    }
    try {
      const data = { postId: post?._id, reporterId: userId, reason: reason };
      await postReport(data);
      notify();
      setTimeout(() => {
        show(false);
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div
        className="fixed top-0 left-0 bg-gray-500 opacity-30 right-0 bottom-0 z-10"
        onClick={() => show(false)}
      ></div>
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
        className={"z-50"}
      />
      <div className="w-[11rem] flex flex-col justify-center border-2 border- items-center  h-[16.2rem] hide-scrollbar overflow-y-auto bg-black bg-opacity-90 fixed top-[50%] left-[50%] right-[auto] bottom-[auto] -mr-[50%] transform translate-x-[-50%] translate-y-[-50%]  z-20 rounded-3xl">
        <img src={post.image} alt="" className="w-full mb-5" />
        <ul className="w-full text-center ">
          {user ? (
            <li
              className="my-2 cursor-pointer text-red-500"
              onClick={handleDelete}
            >
              Delete
            </li>
          ) : (
            <>
              <li className="my-2 text-red-500">Report</li>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  required
                  onChange={(e) => setReason(e.target.value.trim())}
                  placeholder="reason"
                  className="w-full px-2 bg-transparent mb-2 hide-scrollbar border text-white border-gray-300 rounded-md focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-transparent  p-1  text-white focus:outline-none"
                >
                  <AiOutlineSend size={15} />
                </button>
              </form>
            </>
          )}
          <hr />
          <li className="my-2 cursor-pointer " onClick={() => show(false)}>
            Cancel
          </li>
        </ul>
      </div>
    </>
  );
};

export default PostOption;
