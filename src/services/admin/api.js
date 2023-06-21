import axios from "axios";
import { adminAuth } from "../../const/localstorage";

export const adminApi = axios.create({
    baseURL: "http://localhost:3001/api",
  });
  
  adminApi.interceptors.request.use(
    function (config) {
      config.headers["Authorization"] = localStorage.getItem(adminAuth);
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );