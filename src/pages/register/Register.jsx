/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useRef, useState } from "react";
import Button from "../../components/micros/Button";
import { Link, useNavigate } from "react-router-dom";
import { UseRegisterValidate } from "../../hooks/registerValidate";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { userUrls } from "../../const/routesPath";
// import { useDispatch } from "react-redux";
// import { setReduxUser } from "../../utils/reduxSlices/user";
import AuthMiddleWare from "../../services/authMiddleWare";
import { apiCall } from "../../services/apiCalls";
import Modal from "../../components/micros/emailSentModal/Modal";
import Loading from "../../components/loading/Loading";

const Register = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const usernameValue = useRef(null);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const [credentials, setCredentials] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [googleAuth, setGoogleAuth] = useState(null);
  const [error, setError] = useState(null);
  const [validUsername, setValidUsername] = useState(null);

  useEffect(() => {
    if (googleAuth) {
      usernameValue.current.value = googleAuth?.given_name;
    }
  }, [googleAuth]);

  const obj = AuthMiddleWare();
  if (obj.user) {
    navigate("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const status = UseRegisterValidate(credentials, setError);
      if (!status && validUsername) {
        setLoading(true);
        const profilePic = googleAuth?.picture;
        let cred;
        if (profilePic === undefined) {
          cred = { ...credentials };
        } else {
          cred = { ...credentials, profilePic };
        }
        const data = { cred };
        const response = await apiCall("post", userUrls.usersRegister, data);
        setLoading(false);
        if (response.data?.status === 200) {
          setShow(true);
          console.log("new user registered but not verified");
        }
      } else if (!status && !validUsername) {
        setError("try another username");
      }
    } catch (error) {
      setLoading(false);
      setError(error.response.data?.error?.msg);
    }
  };

  const handleUsername = async (e) => {
    let username = e.target.value.trim();
    username = username.toLowerCase();
    const data = {
      params: { username },
    };
    const user = await apiCall("get", userUrls.users, data);
    if (!user.data && !username.includes(" ")) {
      setError(null);
      setValidUsername(username);
      setCredentials({
        ...credentials,
        username: username,
      });
    } else {
      setValidUsername(null);
      if (username.includes(" ")) {
        setError("username can't contain space");
      } else {
        setError("username is already taken");
      }
    }
  };
  const title = "Email sent successfully";
  const desc = "Click the url in your email to verify...";
  return (
    <div className="relative">
      {loading && <Loading bg={"none"} />}
      {show && (
        <Modal
          hide={setShow}
          title={title}
          desc={desc}
          emailTo={credentials?.email}
          path="/login"
        />
      )}
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
                ref={usernameValue}
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
              <button
                type="submit"
                className="w-full flex justify-center"
                onClick={(e) => handleSubmit(e)}
              >
                <Button
                  title="Register"
                  clr={"text-black bg-white border-white w-fit"}
                />
              </button>
              <div className="text-center -mt-3 text-black">
                <span className="text-gray-500 text-xs m">OR</span>
                <br />
                <GoogleOAuthProvider
                  clientId={process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}
                >
                  {!googleAuth && (
                    <GoogleLogin
                      width="190"
                      onSuccess={(credentialResponse) => {
                        const data = jwt_decode(credentialResponse.credential);
                        setGoogleAuth(data);
                        setCredentials({
                          ...credentials,
                          email: data?.email,
                          username: data?.given_name,
                        });
                        setValidUsername(data?.given_name);
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
    </div>
  );
};

export default Register;
