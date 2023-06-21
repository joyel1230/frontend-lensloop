import React, { useEffect, useRef } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import ProfileTopDiv from "../../components/profile/ProfileTopDiv";
import { GetUsernameFromRedux } from "../../utils/userInRedux";

const Profile = () => {
  const { username } = useParams();
  const userDetails = GetUsernameFromRedux()
  
  const sectionRef = useRef(null);
  useEffect(() => {   
    sectionRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [])

  return (
    <div className="flex w-full flex-col justify-between gap-10" ref={sectionRef}>
      {username!==userDetails?.username?<Navigate to={`/${userDetails?.username}`}/>:''}
      <div className="sm:flex w-full sm:justify-center mx-auto flex-none">
        <ProfileTopDiv username={username} />
      </div>
      <Outlet username={username}/>
    </div>
  );
};

export default Profile;
