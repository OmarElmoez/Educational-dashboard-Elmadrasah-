import axiosErrorHandler from "@/utils/axiosErrorHandler";
import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

const actFCMLogin = createAsyncThunk(
  "FCM/actFCMLogin",
  async (
    {
      FCM_token,
    }: { FCM_token: string },
    thunkAPI
  ) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const url =
        "/notify/devices/login/";
      // const config = {
      //   headers: {
      //     Authorization: `Token ${user_token}`,
      //   },
      // };
      const data = {
        registration_id: FCM_token,
        type: "web",
      };

      await axiosInstance.post(url, data);
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actFCMLogin;
