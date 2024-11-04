import axios from "axios";
import store from "@/store";
import axiosErrorHandler from "./axiosErrorHandler";

// Don't forget to update the end-point for (actFCMLogin.ts)
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
    console.log('from axios instance', token)

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
