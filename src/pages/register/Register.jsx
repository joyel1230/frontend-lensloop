import React from "react";
import Button from "../../components/micros/button/Button";
import { Link } from "react-router-dom";

const Register = () => {
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
              />
            <input
              type="text"
              placeholder="Username"
              className="h-6 mb-1 p-1 ring-1 ring-black text-sm text-black rounded-lg focus:outline-none"
              required
            />
            <input
              type="password"
              placeholder="Password"
              required
              className="h-6 mb-1  p-1 ring-1 ring-black text-sm text-black rounded-lg focus:outline-none"
              />
            <input
              type="password"
              placeholder="Confirm Password"
              className="h-6 mb-1 p-1 ring-1 ring-black text-sm text-black rounded-lg focus:outline-none"
              required
            />
            <button type="submit">
              <Button title="Register" clr={'bg-black'} />
            </button>
            <div className="text-center -mt-4 text-black">
              <span className="text-gray-500 text-xs">OR</span>
              <br />
              <Link to={''}>
              <Button title="Login with Google" />
              </Link>
            <Link to={'/login'}>
            <span className="text-xs underline">Back to Login</span>
            </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
