import React from "react";
import { Link } from "react-router-dom";

const UserName = (props) => {
  const { username, size } = props;
  return (
    <>
      <Link to={`/${username}`}>
        <span className={size}>{username}</span>
      </Link>
    </>
  );
};

export default UserName;
