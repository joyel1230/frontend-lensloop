import React, { useEffect, useState } from "react";
import ProfilePic from "./ProfilePic";
import UserName from "./UserName";
import { Link } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import Settings from "./Settings";
import {
  getFollow,
  getUserByUsername,
  postFollowers,
  postFollowing,
} from "../../../services/apiMethods";
import Button from "../../micros/Button";
import { GetUsernameFromRedux } from "../../../utils/userInRedux";

const ProfileTopDiv = ({ user, isUser, postCount, userId, show }) => {
  const userDetails = GetUsernameFromRedux();
  const [userDta, setUserData] = useState(null);
  const [settingsToggle, setSettingsToggle] = useState(false);
  const [followTitle, setFollowTitle] = useState("Follow");
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const username = user;
  useEffect(() => {
    const data = {
      params: {
        userId: userId,
      },
    };
    getFollow(data)
      .then((resp) => {
        setFollowers(resp.data?.users[0]?.followers.length || 0);
        setFollowing(resp.data?.users[0]?.following.length || 0);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [userId]);

  useEffect(() => {
    const data = {
      params: {
        userId: userDetails._id,
      },
    };
    getFollow(data)
      .then((resp) => {
        if (resp.data?.users[0]?.following.includes(userId)) {
          show(true)
          setFollowTitle("Following");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [show, userDetails._id, userId]);

  useEffect(() => {
    const data = {
      params: { username },
    };
    getUserByUsername(data)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => console.error(err));
  }, [user, username]);

  const handleFollow = async () => {
    let val;
    if (followTitle === "Follow") {
      val = true;
    } else {
      val = false;
    }
    const data1 = {
      userId: userDetails?._id,
      followerId: userId,
      value: val,
    };
    const data = {
      userId: userId,
      followerId: userDetails?._id,
      value: val,
    };
    try {
      await postFollowers(data);
      await postFollowing(data1);
      if (val) {
        show(true);
        setFollowTitle("Following");
        setFollowers(followers + 1);
      } else {
        show(false);
        setFollowTitle("Follow");
        setFollowers(followers - 1);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    userDta && (
      <>
        <div className="flex justify-center">
          <ProfilePic width="100" dpUrl={userDta?.profilePic} online={false} />
        </div>
        <div className="flex flex-col justify-between sm:ml-5 mt-5 sm:mt-0 select-none">
          <div>
            <div className="flex items-center justify-between">
              <UserName username={user} size="sm:text-3xl text-2xl" />
              {isUser ? (
                <span
                  className="cursor-pointer"
                  onClick={() => setSettingsToggle(!settingsToggle)}
                >
                  <IoSettingsOutline size={25} />
                </span>
              ) : (
                <span onClick={handleFollow}>
                  <Button title={followTitle} />
                </span>
              )}
            </div>
            <div className="flex justify-between text-md mt-8 sm:text-xl gap-5 select-none">
              <h1>{postCount} posts</h1>
              <Link to={`/${userDta?.username}/followers`}>
                <h1>{followers} followers</h1>
              </Link>
              <Link to={`/${userDta?.username}/following`}>
                <h1>{following} following</h1>
              </Link>
            </div>
          </div>

          {settingsToggle && (
            <span className="pt-10">
              <Settings fun={setSettingsToggle} />
            </span>
          )}
        </div>
      </>
    )
  );
};

export default ProfileTopDiv;
