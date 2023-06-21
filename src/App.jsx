import React from "react";
import NavBar from "./components/layout/navBar/NavBar";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AuthMiddleWare from "./services/authMiddleWare";

function App() {
  let user;
  const obj = AuthMiddleWare();
  if (obj.user) {
    user = true;
  } else {
    user = false;
  }
  const theme = useSelector((store) => store?.theme?.currentTheme);
  let bgText =
    theme === "dark"
      ? " bg-[#141414] text-[#ffffff]"
      : "bg-[#ffffff] text-[#141414]";

  return (
    <div
      className={`h-screen w-full ${bgText} duration-500 ease-in-out transform`}
    >
      {!user ? (
        <Navigate to={"login"} />
      ) : (
        <div className="h-screen w-full flex flex-col justify-between">
          <div className="w-full h-full flex mt-0">
            <div className="w-[20%] min-w-fit h-full p-1 py-5 sm:py-1">
              <NavBar />
            </div>
            <div className="w-[80%]  overflow-y-auto max-h-[100%] py-10 px-2 hide-scrollbar">
              <Outlet />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;