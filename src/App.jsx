import React, { useEffect, useState } from "react";
import NavBar from "./components/layout/navBar/NavBar";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AuthMiddleWare from "./services/authMiddleWare";
import { getUserByUsername } from "./services/apiMethods";
import { userAuth } from "./const/localstorage";
import Search from "./pages/search/Search";

function App() {
  const [showSearch, setShowSearch] = useState(false);
  let user;
  const obj = AuthMiddleWare();
  useEffect(() => {
    const username = obj?.userDetails?.username;
    const data = {
      params: { username },
    };
    getUserByUsername(data)
      .then((res) => {
        if (res?.data?.blocked) {
          localStorage.removeItem(userAuth);
          window.location.reload("/login");
        }
      })
      .catch((err) => console.log(err));
  });

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
              <NavBar search={setShowSearch} />
            </div>
            <div className="w-[80%]  overflow-y-auto max-h-[100%] py-10 px-2 hide-scrollbar">
              <Outlet />
              {showSearch && <Search show={setShowSearch} />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
