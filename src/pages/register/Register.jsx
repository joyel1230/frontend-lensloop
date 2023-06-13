/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import Button from "../../components/micros/Button";
import { Link } from "react-router-dom";
import { useRegisterValidate } from "../../hooks/registerValidate";

const Register = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const status = useRegisterValidate(credentials, setError);
    if (!status) {
      console.log(credentials);
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="relative">
        <img src="./images/login-bg-1.png" width={300} alt="" />
        <form action="">
          <div className="absolute top-44 flex flex-col gap-2 mt-1 left-14">
            <input
              type="email"
              placeholder="Email"
              className="h-6 mb-1 ring-1 ring-black text-sm text-black p-1 rounded-lg focus:outline-none "
              required
              onChange={(e) =>
                setCredentials({
                  ...credentials,
                  email: e.target.value.trim(),
                })
              }
            />
            <input
              type="text"
              placeholder="Username"
              className="h-6 mb-1 p-1 ring-1 ring-black text-sm text-black rounded-lg focus:outline-none"
              required
              onChange={(e) =>
                setCredentials({
                  ...credentials,
                  username: e.target.value.trim(),
                })
              }
            />
            <input
              type="password"
              placeholder="Password"
              required
              className="h-6 mb-1  p-1 ring-1 ring-black text-sm text-black rounded-lg focus:outline-none"
              onChange={(e) =>
                setCredentials({
                  ...credentials,
                  password: e.target.value.trim(),
                })
              }
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="h-6 mb-1 p-1 ring-1 ring-black text-sm text-black rounded-lg focus:outline-none"
              required
              onChange={(e) =>
                setCredentials({
                  ...credentials,
                  confirmPassword: e.target.value.trim(),
                })
              }
            />
            <button type="submit" onClick={(e) => handleSubmit(e)}>
              <Button title="Register" clr={"bg-black text-white"} />
            </button>
            <div className="text-center -mt-4 text-black">
              <span className="text-gray-500 text-xs">OR</span>
              <br />
              <Link to={""}>
                <Button title="Login with Google" />
              </Link>
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
