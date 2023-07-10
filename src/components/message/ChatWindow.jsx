import React, { useEffect, useRef, useState } from "react";
import Back from "../micros/Back";
import { useParams } from "react-router-dom";
import ProfilePic from "../profile/mainComponents/ProfilePic";
import { AiOutlineSend } from "react-icons/ai";
import io from "socket.io-client";
import { GetUsernameFromRedux } from "../../utils/userInRedux";
import {
  getChat,
  getUserByUsername,
  postChat,
} from "../../services/apiMethods";
import Loading from "../loading/Loading";

const ChatWindow = () => {
  const userDetails = GetUsernameFromRedux();
  const socket = io.connect("http://localhost:3001");
  const { username } = useParams();
  const [message, setMessage] = useState("");
  const [pic, setpic] = useState("");
  const lastmsg = useRef();
  const roomArray = [userDetails?.username, username].sort();
  const room = roomArray[0] + roomArray[1];
  const inputRef = useRef("");
  const [msgArray, setMsgArray] = useState([]);
  const [otherUser, setOtherUser] = useState({});
  const [load, setLoad] = useState(true);

  useEffect(() => {
    if (otherUser?._id) {
      const data = {
        params: {
          user1: userDetails?._id,
          user2: otherUser?._id,
        },
      };
      getChat(data)
        .then((res) => {
          console.log(res);
          if (res?.data?.chat?.msgData) {
            setMsgArray(res?.data?.chat?.msgData);
          }
          setLoad(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [otherUser?._id, userDetails?._id]);

  useEffect(() => {
    const data = {
      params: { username },
    };
    getUserByUsername(data)
      .then((res) => {
        setOtherUser(res?.data);
        setpic(res?.data?.profilePic);
      })
      .catch((err) => console.log(err));
  }, [username]);

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      if (data?.data?.username !== username) {
        setMsgArray([
          ...msgArray,
          { userId: { username: username }, message: data?.data?.message },
        ]);
      }
    });
  }, [msgArray, socket, username]);
  useEffect(() => {
    lastmsg.current.scrollIntoView({ behavior: "smooth" });
  }, [msgArray]);

  if (room !== "") {
    socket.emit("join_room", room);
  }

  const handleMessage = async () => {
    if (message === "") {
      return;
    }
    inputRef.current.value = "";
    setMsgArray([
      ...msgArray,
      { userId: { username: userDetails?.username }, message: message },
    ]);
    const data = { message, username };
    socket.emit("send_message", { data, room });
    try {
      const data = {
        users: [userDetails?._id, otherUser?._id],
        msgObj: { userId: userDetails?._id, message: message },
      };
      postChat(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className=" w-[70%] ms-3 rounded-xl h-[35rem] bg-black bg-opacity-90 fixed z-20 border-2">
        <div className="fixed rounded-t-lg w-[69.65%]">
          <Back />
          <h2 className="text-2xl text-center pb-2 font-semibold font-sans">
            {username}
          </h2>
          <hr />
        </div>
        <div className="h-[80%] text-xs md:text-sm mt-20 px-1 md:px-10 flex flex-col justify-between">
          <div className="flex flex-col justify-end h-[85%] pt-auto">
            <div className="hide-scrollbar overflow-y-auto px-5">
              {load ? (
                <Loading bg={true} />
              ) : (
                msgArray.map((data, i) => {
                  return data?.userId?.username === username ? (
                    <div className="flex w-[80%] mt-10" key={data?._id || i}>
                      <div className=" w-1/12 mr-2 sm:mr-0">
                        <ProfilePic width={25} dpUrl={pic} online={false} />
                      </div>
                      <p className="w-11/12 mt-1">{data?.message}</p>
                    </div>
                  ) : (
                    <div className="flex justify-end " key={data?._id || i}>
                      <p className="text-end mt-10 w-fit bg-gray-500 p-2  rounded-2xl">
                        {data?.message}
                      </p>
                    </div>
                  );
                })
              )}

              <p ref={lastmsg}></p>
            </div>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="type..."
              ref={inputRef}
              onChange={(e) => setMessage(e.target.value.trim())}
              className="w-full bg-transparent px-4 pr-10 py-2 hide-scrollbar border text-white border-gray-300 rounded-md focus:outline-none"
            />
            <span
              className="absolute right-3 top-[0.4rem] cursor-pointer"
              onClick={handleMessage}
            >
              <AiOutlineSend size={25} />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatWindow;
