import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001/api",
});

api.interceptors.request.use(
  function (config) {
    config.headers["Authorization"] = localStorage.getItem("UserAuth");
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
