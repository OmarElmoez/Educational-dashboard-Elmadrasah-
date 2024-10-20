import axios from "axios";
import store from "@/store";
import axiosErrorHandler from "./axiosErrorHandler";

const axiosInstance = axios.create({
  baseURL: "https://elmadrasah-development-ff14bf466889.herokuapp.com",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.credintials?.token;
    // const auth = localStorage.getItem("persist:auth");

    // const parsedAuth = auth && auth.length > 0 ? JSON.parse(auth) : null;

    // const parsedUser =
    //   parsedAuth.user && parsedAuth.user.length > 0
    //     ? JSON.parse(parsedAuth.user)
    //     : null;

    // const token = parsedUser ? parsedUser.token : "";
    // console.log("token", token);

    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }

    return config;
  },
  (error) => axiosErrorHandler(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => axiosErrorHandler(error)
);

export default axiosInstance;
