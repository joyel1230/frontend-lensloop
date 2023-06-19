/* eslint-disable react-hooks/rules-of-hooks */

import React, { useEffect, useState } from "react";
import Button from "../../components/micros/Button";
import { Link, useNavigate } from "react-router-dom";
import { useLoginValidate } from "../../hooks/loginValidate";
import AuthMiddleWare from "../../services/authMiddleWare";
import { userUrls } from "../../const/routesPath";
import { setReduxUser } from "../../utils/reduxSlices/user";
import { useDispatch } from "react-redux";
import { apiCall } from "../../services/apiCalls";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    emailOrUsername: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const obj = AuthMiddleWare();
  useEffect(() => {
    if (obj.user) {
      navigate("/");
    }
  }, [navigate, obj, obj.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const status = useLoginValidate(credentials, setError);
    if (!status) {
      try {
        const data = { credentials };
        const response = await apiCall("post", userUrls.usersLogin, data);
        if (response?.status === 200) {
          localStorage.setItem("UserAuth", response.data.userToken);
          dispatch(setReduxUser());
          window.location.reload("/");
          console.log("login successful");
        } else {
          setError(response.data?.error?.msg);
        }
      } catch (error) {
        console.log(error);
        setError(error?.response?.data?.error?.msg);
      }
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="relative">
        <img src="./images/login-bg-1.png" width={300} alt="" />
        <form action="">
          <div className="absolute top-[11.5rem] flex flex-col gap-0 left-14">
            <label htmlFor="" className="text-black">
              Email / Username
            </label>
            <input
              type="text"
              placeholder=""
              className="neumorphic-input"
              onChange={(e) =>
                setCredentials({
                  ...credentials,
                  emailOrUsername: e.target.value.trim(),
                })
              }
              value={credentials.emailOrUsername}
              required
            />
            <label htmlFor="" className="text-black mt-3">
              Password
            </label>
            <input
              type="password"
              placeholder=""
              className="neumorphic-input mb-3"
              onChange={(e) =>
                setCredentials({
                  ...credentials,
                  password: e.target.value.trim(),
                })
              }
              value={credentials.password}
              required
            />
            <span className="text-center mb-2 text-sm text-gray-600">
              <Link to={"../forgot"}>forgot password</Link>
            </span>
            <button
              type="submit"
              className="w-full flex justify-center"
              onClick={(e) => handleSubmit(e)}
            >
              <Button
                title="Login"
                clr={"text-black bg-white border-white w-fit"}
              />
            </button>
            <div className="text-center">
              <span className="text-gray-500 text-sm">OR</span>
              <br />
              <Link to={"/register"} className="text-black">
                Create new account
              </Link>
            </div>
          </div>
          <span className="absolute bottom-12 w-full text-center text-red-500">
            {error}
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
