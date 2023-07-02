import React, { useState } from "react";
import Loading from "../../loading/Loading";
import { Link } from "react-router-dom";
import { AiOutlinePlusCircle } from "react-icons/ai";

const ProfileBar = ({ load, change, user }) => {
  const [underline, setUnderline] = useState("");
  return (
    <div className="px-1 sm:w-[85%] sm:mx-auto  select-none">
      {load && <Loading bg={"none"} />}
      <div className="flex justify-between my-2 text-lg sm:text-2xl border-b-2 border-t-2 border-current py-3">
        <div className="flex items-center gap-4">
          <h1
            className={`cursor-pointer ${underline === "" ? `underline` : ""}`}
            onClick={() => {
              change("");
              setUnderline("");
            }}
          >
            Posts
          </h1>
          {user && (
            <Link to={`/new-post`}>
              <AiOutlinePlusCircle />
            </Link>
          )}
        </div>
        {user && (
          <>
            <div>
              <h1
                className={`cursor-pointer ${
                  underline === "saved" ? `underline` : ""
                }`}
                onClick={() => {
                  change("saved");
                  setUnderline("saved");
                }}
              >
                Saved
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <h1
                className={`cursor-pointer ${
                  underline === "ads" ? `underline` : ""
                }`}
                onClick={() => {
                  change("ads");
                  setUnderline("ads");
                }}
              >
                ADS
              </h1>
              <Link to={`/ads`}>
                <AiOutlinePlusCircle />
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileBar;
