import React from "react";
import "./loading.css";

const Loading = ({ bg }) => {
  return bg ? (
    <div className="fixed bg-black opacity-80 top-0 left-0 right-0 bottom-0 z-10">
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="spinner">
          <span>L</span>
          <span>O</span>
          <span>A</span>
          <span>D</span>
          <span>I</span>
          <span>N</span>
          <span>G</span>
        </div>
      </div>
    </div>
  ) : (
    <div className="fixed bg-black top-0 left-0 right-0 bottom-0 z-10">
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="spinner">
          <span>L</span>
          <span>E</span>
          <span>N</span>
          <span>S</span>
          <span>L</span>
          <span>O</span>
          <span>O</span>
          <span>P</span>
        </div>
      </div>
    </div>
  );
};

export default Loading;

