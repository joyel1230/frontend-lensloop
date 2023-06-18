/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import Button from "../../components/micros/Button";
import { Link } from "react-router-dom";
import { useRegisterValidate } from "../../hooks/registerValidate";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { api } from "../../services/api";
import { userUrls } from "../../const/routesPath";
import { useDispatch } from "react-redux";
import { setReduxUser } from "../../utils/reduxSlices/user";
import AuthMiddleWare from "../../services/authMiddleWare";

const Register = () => {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [googleAuth, setGoogleAuth] = useState(null);
  const [error, setError] = useState(null);
  const [validUsername, setValidUsername] = useState(null);

  const obj = AuthMiddleWare();
  if (obj.user) {
    window.location.href = "/";
  }

  // const user = localStorage.getItem("google_user");
  // console.log(JSON.parse(user).picture);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const status = useRegisterValidate(credentials, setError);
    if (!status && validUsername) {
      const profilePic = googleAuth?.picture;
      const cred = { ...credentials, profilePic };
      const response = await api.post(userUrls.usersRegister, { cred });
      if (response.data.status === 200) {
        localStorage.setItem("UserAuth", response.data.userToken);
        dispatch(setReduxUser());
        console.log("new user");
      } else {
        setError(response.data?.error?.msg);
      }
    } else if (!status && !validUsername) {
      setError("try another username");
    }
  };

  const handleUsername = async (e) => {
    const username = e.target.value.trim();
    const user = await api.get(userUrls.users, {
      params: { username },
    });
    if (!user.data || !username.includes(" ")) {
      setError(null);
      setValidUsername(username);
      setCredentials({
        ...credentials,
        username: username,
      });
    } else {
      setValidUsername(null);
      setError("username is already taken");
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="relative">
        <img src="./images/login-bg-1.png" width={300} alt="" />
        <form action="">
          <div className="absolute top-44 flex flex-col gap-2 mt-1 left-14">
            {googleAuth?.email ? (
              <input
                type="email"
                placeholder="Email"
                className="neumorphic-input"
                disabled
                value={googleAuth?.email}
              />
            ) : (
              <input
                type="email"
                placeholder="Email"
                className="neumorphic-input"
                required
                value={credentials?.email}
                onChange={(e) =>
                  setCredentials({
                    ...credentials,
                    email: e.target.value.trim().replace(" ", ""),
                  })
                }
              />
            )}
            <input
              type="text"
              placeholder="Username"
              className="neumorphic-input"
              required
              onChange={(e) => handleUsername(e)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              className="neumorphic-input"
              onChange={(e) =>
                setCredentials({
                  ...credentials,
                  password: e.target.value.trim().replace(" ", ""),
                })
              }
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="neumorphic-input"
              required
              onChange={(e) =>
                setCredentials({
                  ...credentials,
                  confirmPassword: e.target.value.trim().replace(" ", ""),
                })
              }
            />
            <button type="submit" onClick={(e) => handleSubmit(e)}>
              <Button title="Register" clr={"text-white"} />
            </button>
            <div className="text-center -mt-4 text-black">
              <span className="text-gray-500 text-xs">OR</span>
              <br />
              <GoogleOAuthProvider
                clientId={process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}
              >
                {!googleAuth && (
                  <GoogleLogin
                    width="190"
                    onSuccess={(credentialResponse) => {
                      const data = jwt_decode(credentialResponse.credential);
                      console.log(data);
                      setGoogleAuth(data);
                      setCredentials({
                        ...credentials,
                        email: data?.email,
                      });
                      const data1 = JSON.stringify(data);
                      localStorage.setItem("google_user", data1);
                    }}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                  />
                )}
              </GoogleOAuthProvider>

              <Link to={"/login"}>
                <span className="text-xs underline">Back to Login</span>
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

export default Register;
