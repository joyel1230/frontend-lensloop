import React, { useState } from "react";
import Button from "../../components/micros/button/Button";
import { Link } from "react-router-dom";

const Login = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('')
  const [password, setPassword] = useState('')
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
              onChange={(e)=>setEmailOrUsername(e.target.value)}
              value={emailOrUsername}
              required
              />
            <label htmlFor="" className="text-black mt-3">
              Password
            </label>
            <input
              type="password"
              placeholder=""
              className="h-8 border-b-1 border-black p-1 text-black rounded-lg focus:outline-none mb-2"
              onChange={(e)=>setPassword(e.target.value)}
              value={password}
              required
            />
            <span className="text-center mb-2 text-sm text-gray-600">
              forgot password
            </span>
            <button type="submit">
            <Button title="Login" clr={'bg-black'} />
            </button>
            <div className="text-center">
              <span className="text-gray-500 text-sm">OR</span>
              <br />
              <Link to={'/register'} className="text-black">
              <Button title="Register" />
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
