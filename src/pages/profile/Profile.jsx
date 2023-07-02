import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProfileTopDiv from "../../components/profile/mainComponents/ProfileTopDiv";
import { GetUsernameFromRedux } from "../../utils/userInRedux";
import ProfilePostSection from "../../components/profile/mainComponents/ProfilePostSection";
import { getUserByUsername } from "../../services/apiMethods";
import Loading from "../../components/loading/Loading";

const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const userDetails = GetUsernameFromRedux();
  const [userId, setuserId] = useState(userDetails?._id);
  const [privateUser, setPrivateUser] = useState(true);
  const isUser = username === userDetails?.username;
  const sectionRef = useRef(null);
  const [postCount, setPostCount] = useState(0);
  const [isFollow, setisFollow] = useState(false)
  useEffect(() => {
    const data = {
      params: { username },
    };
    setLoading(false);
    getUserByUsername(data)
      .then((resp) => {
        if (resp.data === null) {
          navigate(-1);
        }
        setuserId(resp.data?._id);
        setLoading(true);
        console.log(resp.data)
        setPrivateUser(resp.data?.private);
        if (isUser) {
          setPrivateUser(false);
        }
        // sectionRef.current.scrollIntoView({ behavior: "smooth" });
      })
      .catch((err) => console.error(err));
  }, [isUser, navigate, username]);
  return loading ? (
    <>
      <div
        className="flex w-full flex-col justify-between gap-10"
        ref={sectionRef}
      >
        <div className="sm:flex w-full sm:justify-center mx-auto flex-none">
          <ProfileTopDiv
            postCount={postCount}
            user={username}
            userId={userId}
            isUser={isUser}
            show={setisFollow}
          />
        </div>
        {!privateUser || isFollow ? (
          <ProfilePostSection
            setCount={setPostCount}
            userId={userId}
            isUser={isUser}
          />
        ):<p className="pt-20 text-center text-3xl">Private Account</p>}
      </div>
    </>
  ) : (
    <Loading bg={true} />
  );
};

export default Profile;
