import React, { useEffect, useRef } from "react";
import { Navigate, useParams } from "react-router-dom";
import ProfileTopDiv from "../../components/profile/ProfileTopDiv";
import { GetUsernameFromRedux } from "../../utils/userInRedux";
import ProfilePostSection from "../../components/profile/ProfilePostSection";

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
      <ProfilePostSection username={username}/>
    </div>
  );
};

export default Profile;
