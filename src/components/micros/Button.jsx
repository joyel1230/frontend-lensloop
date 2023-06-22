import React from "react";

const Button = (props) => {
  let btnblk = "";
  if (props.clr) {
    btnblk = props?.clr;
  }
  return (
    <div
      className={`border-2 border-current p-1 px-5 rounded-xl ${btnblk} hover:bg-gray-500 text-center cursor-pointer`}
    >
      <span className="font-extrabold">{props?.title}</span>
    </div>
  );
};

export default Button;
