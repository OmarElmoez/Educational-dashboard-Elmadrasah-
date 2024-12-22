import axios from "axios";
import store from "@/store";
import axiosErrorHandler from "./axiosErrorHandler";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PRO_SERVER,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.credintials?.token;

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
