import React from "react";
import "./modal.style.css";
import { Link } from "react-router-dom";

const Modal = (props) => {
  let { hide, path, emailTo, title, desc } = props;
  return (
    <div className="absolute top-[50%] left-[50%] right-[auto] bottom-[auto] -mr-[50%] transform translate-x-[-50%] translate-y-[-50%] z-10">
      <div className="card1 p-2">
        <Link to={path}>
          <button className="dismiss" type="button" onClick={() => hide(false)}>
            ×
          </button>
        </Link>
        <div className="header">
          <div className="image">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M20 7L9.00004 18L3.99994 13"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </div>
          <div className="content select-none">
            <span className="title my-5">{title}</span>
            <p>{emailTo ? `(${emailTo})` : ""} </p>
            <p className="message my-5">{desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
