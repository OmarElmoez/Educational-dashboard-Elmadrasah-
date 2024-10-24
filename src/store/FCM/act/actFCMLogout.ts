import axiosErrorHandler from "@/utils/axiosErrorHandler";
// import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const actFCMLogout = createAsyncThunk(
  "FCM/actFCMLogout",
  async ({ token, FCM_token }: { token: string | undefined, FCM_token: string }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const url = "https://elmadrasah-development-ff14bf466889.herokuapp.com/notify/devices/logout/";

      const data = {
        registration_id: FCM_token,
        type: "web",
      };

      const config = {
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Token ${token}`,
          }
      }

      await axios.post(url, data, config);
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actFCMLogout;
