import React, { useState } from "react";
import Modal from "../../components/micros/emailSentModal/Modal";
import { apiCall } from "../../services/apiCalls";
import { userUrls } from "../../const/routesPath";
import Loading from "../../components/loading/Loading";
import Back from "../../components/micros/Back";

const ForgotPass = () => {
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const [newPass, setNewPass] = useState("");
  const [rePass, setRePass] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const title = "Password updated";
  const desc = "Go to email to verify and login with new password";

  const handleSubmit = async (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    e.preventDefault();
    try {
      if (newPass === rePass && newPass.length >= 4 && emailRegex.test(email)) {
        setErr("");
        setLoading(true);
        const data = { email, newPass };
        const response = await apiCall("post", userUrls.usersForgot, data);
        setLoading(false);
        if (response.status === 200) {
          setShow(true);
        }
      } else {
        setErr(
          "email is not valid or passwords are not same or no minimum characteres(4)."
        );
      }
    } catch (error) {
      setLoading(false);
      setErr(error.response.data?.msg);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
      {loading && <Loading bg={"none"} />}
      {show && <Modal hide={setShow} title={title} desc={desc} path="/login" />}
      <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-3xl">
        <h2 className="text-2xl font-bold mb-8">Forgot Password</h2>
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="Email"
            >
              Email
            </label>
            <input
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-black"
              id="email"
              type="email"
              placeholder="Enter your Email"
              required
              onChange={(e) => {
                setEmail(e.target.value.trim());
                setErr("");
              }}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="newPassword"
            >
              New Password
            </label>
            <input
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-black"
              id="newPassword"
              type="password"
              placeholder="Enter your new password"
              required
              minLength={4}
              onChange={(e) => {
                setNewPass(e.target.value.trim());
                setErr("");
              }}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-black"
              id="confirmPassword"
              type="password"
              placeholder="Confirm your new password"
              required
              minLength={4}
              onChange={(e) => {
                setRePass(e.target.value.trim());
                setErr("");
              }}
            />
          </div>
          <div className="flex items-center justify-between">
            <Back />
            <button
              className="bg-black text-white px-4 py-3 rounded-lg hover:bg-green-900 transition-colors duration-300"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              Reset Password
            </button>
          </div>
          <span className="text-red-500">{err}</span>
        </form>
      </div>
    </div>
  );
};

export default ForgotPass;
