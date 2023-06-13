/* eslint-disable react-hooks/rules-of-hooks */

import React, { useState } from "react";
import Button from "../../components/micros/Button";
import { Link } from "react-router-dom";
import { useLoginValidate } from "../../hooks/loginValidate";

const Login = () => {
  const [credentials, setCredentials] = useState({
    emailOrUsername: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const status = useLoginValidate(credentials, setError);
    if (!status) {
      console.log(credentials);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="relative">
        <img src="./images/login-bg-1.png" width={300} alt="" />
        <form action="">
          <div className="absolute top-44 flex flex-col gap-0 left-14">
            <label htmlFor="" className="text-black">
              Email / Username
            </label>
            <input
              type="text"
              placeholder=""
              className="h-8 border-b-1 border-black text-black p-1 rounded-lg focus:outline-none "
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
              className="h-8 border-b-1 border-black p-1 text-black rounded-lg focus:outline-none mb-2"
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
              forgot password
            </span>
            <button type="submit" onClick={(e) => handleSubmit(e)}>
              <Button title="Login" clr={"bg-black text-white"} />
            </button>
            <div className="text-center">
              <span className="text-gray-500 text-sm">OR</span>
              <br />
              <Link to={"/register"} className="text-black">
                <Button title="Register" />
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
