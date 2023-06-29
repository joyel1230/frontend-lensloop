import React, { useEffect, useState } from "react";
import Button from "../../components/micros/Button";
import { Link, useNavigate } from "react-router-dom";
import { UseLoginValidate } from "../../hooks/loginValidate";
import AuthMiddleWare from "../../services/authMiddleWare";
import { setReduxUser } from "../../utils/reduxSlices/user";
import { useDispatch } from "react-redux";
import { userAuth } from "../../const/localstorage";
import { postLogin } from "../../services/apiMethods";

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
    const status = UseLoginValidate(credentials, setError);
    if (!status) {
      try {
        const data = { credentials };
        const response = await postLogin(data);
        if (response?.status === 200) {
          localStorage.setItem(userAuth, response.data.userToken);
          dispatch(setReduxUser());
          window.location.reload("/");
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
    <>
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
          <div className="max-w-md w-full bg-white pb-10 px-5  shadow-lg rounded-3xl">
            <h2 className="text-4xl text-center font-bold mb-8">ℒ𝑒𝓃𝓈ℒ𝑜𝑜𝓅</h2>
            <form>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email / Username
                </label>
                <input
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-black"
                  id="emailOrUsername"
                  type="text"
                  onChange={(e) =>
                    setCredentials({
                      ...credentials,
                      emailOrUsername: e.target.value.trim(),
                    })
                  }
                  value={credentials.emailOrUsername}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Password
                </label>
                <input
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-black"
                  id="newPassword"
                  type="password"
                  minLength={4}
                  onChange={(e) =>
                    setCredentials({
                      ...credentials,
                      password: e.target.value.trim(),
                    })
                  }
                  value={credentials.password}
                  required
                />
              </div>
              <div className="text-center mb-2 text-sm text-gray-600">
                <Link to={"../forgot"}>forgot password? & verify</Link>
              </div>
              <div className="flex items-center justify-center">
                <button type="submit" onClick={(e) => handleSubmit(e)}>
                  <Button
                    title="Login"
                    clr={"text-white py-2 bg-black border-white w-fit"}
                  />
                </button>
              </div>
              <div className="text-center pb-4">
                <span className="text-gray-500 text-sm">OR</span>
                <br />
                <Link to={"/register"} className="text-black">
                  Create new account
                </Link>
              </div>
              <p className="text-center text-red-500">{error}</p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
