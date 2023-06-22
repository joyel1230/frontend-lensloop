import React from "react";

const Loading = () => {
  return (
    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
      <img src="images/loading.gif" alt="" />
    </div>
  );
};

export default Loading;
