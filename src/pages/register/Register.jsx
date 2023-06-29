/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useRef, useState } from "react";
import Button from "../../components/micros/Button";
import { Link, useNavigate } from "react-router-dom";
import { UseRegisterValidate } from "../../hooks/registerValidate";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import AuthMiddleWare from "../../services/authMiddleWare";
import Modal from "../../components/micros/emailSentModal/Modal";
import Loading from "../../components/loading/Loading";
import { getUserByUsername, postRegister } from "../../services/apiMethods";

const Register = () => {
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
        const response = await postRegister(data)
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
    try {
      let username = e.target.value.trim();
      username = username.toLowerCase();
      const data = {
        params: { username },
      };
      const user = await getUserByUsername(data)
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
    } catch (error) {}
  };
  const title = "Email sent successfully";
  const desc = "Click the url in your email to verify...";
  return (
    <>
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

        <div className="container h-screen flex items-center justify-center">
          <div
            id="img-div"
            className="bg-cover w-[25rem] h-[35rem] mt-10  bg-center bg-no-repeat relative p-[1.3rem] hidden md:block"
            style={{ backgroundImage: "url(./images/home-phones-2x.png)" }}
          >
            <img
              src="./images/screenshot3-2x.png"
              alt=""
              className="w-[14rem] ms-[6.9rem]"
            />
          </div>
          <div className="h-screen md:h-[35rem] w-full px-5 md:px-0 md:w-[20rem]  flex items-center justify-center">
            <div className="max-w-md w-full bg-white py-10 px-5  shadow-lg rounded-3xl">
              <h2 className="text-4xl text-center font-bold mb-4">ℒ𝑒𝓃𝓈ℒ𝑜𝑜𝓅</h2>
              <form>
                <div className="mb-1">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-0"
                  >
                    Email
                  </label>

                  {googleAuth?.email ? (
                    <input
                      type="email"
                      className="w-full px-4 py-1 rounded-lg border border-gray-300 focus:outline-none focus:border-black"
                      disabled
                      value={googleAuth?.email}
                    />
                  ) : (
                    <input
                      type="email"
                      className="w-full px-4 py-1 rounded-lg border border-gray-300 focus:outline-none focus:border-black"
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
                </div>
                <div className="mb-1">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-0"
                  >
                    Username
                  </label>
                  <input
                    className="w-full px-4 py-1 rounded-lg border border-gray-300 focus:outline-none focus:border-black"
                    id="username"
                    type="text"
                    required
                    ref={usernameValue}
                    onChange={(e) => handleUsername(e)}
                  />
                </div>
                <div className="mb-1">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-0"
                  >
                    Password
                  </label>
                  <input
                    className="w-full px-4 py-1 rounded-lg border border-gray-300 focus:outline-none focus:border-black"
                    id="newPassword"
                    minLength={4}
                    type="password"
                    required
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        password: e.target.value.trim().replace(" ", ""),
                      })
                    }
                  />
                </div>
                <div className="mb-1">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-0"
                  >
                    Confirm Password
                  </label>
                  <input
                    className="w-full px-4 py-1 rounded-lg border border-gray-300 focus:outline-none focus:border-black"
                    id="confirmPassword"
                    minLength={4}
                    required
                    type="password"
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        confirmPassword: e.target.value.trim().replace(" ", ""),
                      })
                    }
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex justify-center"
                  onClick={(e) => handleSubmit(e)}
                >
                  <Button
                    title="Register"
                    clr={"text-white py-2 bg-black border-white w-fit"}
                  />
                </button>

                <div className="flex flex-col items-center gap-1 text-black">
                  <span className="text-gray-500 text-xs">OR</span>
                  <GoogleOAuthProvider
                    clientId={process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}
                  >
                    {!googleAuth && (
                      <GoogleLogin
                        width="190"
                        onSuccess={(credentialResponse) => {
                          const data = jwt_decode(
                            credentialResponse.credential
                          );
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
                <p className="text-center text-red-500">{error}</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
