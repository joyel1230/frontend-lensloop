import React, { useState } from "react";

const ToggleSwitch = ({ checked, color }) => {
  const [check, setChecked] = useState(false);
  let color2;
  if (color === "red") {
    color = "bg-gray-400";
    color2 = "bg-green-500";
  } else {
    color = "bg-gray-400";
    color2 = "bg-red-500";
  }
  const handleChange = () => {
    setChecked(!check);
  };

  return (
    <div className="flex items-center justify-center">
      <input
        type="checkbox"
        id="toggleSwitch"
        className="hidden"
        checked={checked}
        onChange={handleChange}
      />
      <label
        htmlFor="toggleSwitch"
        className="flex items-center cursor-pointer"
      >
        <span className="relative">
          <span
            className={`block w-10 h-6 ${
              checked ? color2 : color
            } rounded-full shadow-inner`}
          ></span>
          <span
            className={`${
              checked ? "translate-x-4 bg-gray-200" : "bg-gray-200"
            } absolute left-0 top-0 w-6 h-6 rounded-full transform transition-transform duration-200`}
          ></span>
        </span>
      </label>
    </div>
  );
};

export default ToggleSwitch;
