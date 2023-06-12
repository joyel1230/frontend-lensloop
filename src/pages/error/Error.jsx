import React from "react";
import { useRouteError } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <div className="text-3xl">{err.status +':'+ err.statusText}</div>
      <p className="text-red-500">{err.data}</p>
    </div>
  );
};

export default Error;
