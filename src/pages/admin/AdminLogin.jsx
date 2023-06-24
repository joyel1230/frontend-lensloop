import React, { useEffect } from "react";
import { Formik } from "formik";
import { adminApiCall } from "../../services/admin/apiCalls";
import { adminUrls } from "../../const/routesPath";
import { adminAuth } from "../../const/localstorage";
import { AdminAuthMiddleWare } from "../../services/authMiddleWare";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const adminCheck = AdminAuthMiddleWare();
  const navigate = useNavigate();
  useEffect(() => {
    if (adminCheck.admin) {
      navigate("/admin");
    }
  }, [adminCheck.admin, navigate,adminCheck]);

  return (
    <>
      {!adminCheck.admin && (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
          <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-3xl">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Adimin Login
            </h2>
            <Formik
              initialValues={{ email: "", password: "" }}
              validate={(values) => {
                const errors = {};
                if (!values.email) {
                  errors.email = "Required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Invalid email address";
                } else if (values.email !== process.env.REACT_APP_ADMIN_EMAIL) {
                  errors.email = "wrong email";
                }
                if (!values.password) {
                  errors.password = "Required";
                } else if (values.password.length < 4) {
                  errors.password = "Minimum 4 characters";
                } else if (
                  values.password !== process.env.REACT_APP_ADMIN_PASS
                ) {
                  errors.password = "wrong password";
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(async () => {
                  try {
                    const data = { email: values?.email };
                    const response = await adminApiCall(
                      "post",
                      adminUrls.adminLogin,
                      data
                    );
                    localStorage.setItem(adminAuth, response.data);
                    window.location.reload("/admin");
                  } catch (error) {
                    console.log(error);
                  } finally {
                    setSubmitting(false);
                  }
                }, 1000);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form
                  onSubmit={handleSubmit}
                  className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                >
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-black ${
                        errors.email && touched.email ? "border-red-500" : ""
                      }`}
                      id="email"
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      placeholder="Enter your email"
                    />
                    {errors.email && touched.email && (
                      <p className="text-red-500 text-xs italic">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-black ${
                        errors.password && touched.password
                          ? "border-red-500"
                          : ""
                      }`}
                      id="password"
                      type="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      placeholder="Enter your password"
                    />
                    {errors.password && touched.password && (
                      <p className="text-red-500 text-xs italic">
                        {errors.password}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-center">
                    <button
                      className="bg-black text-white px-4 py-3 rounded-lg hover:bg-green-900 transition-colors duration-300"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminLogin;
