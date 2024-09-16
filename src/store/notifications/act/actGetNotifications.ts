import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { TNotificationResponse } from "@/schemas";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const actGetNotifications = createAsyncThunk(
  "notifications/actGetNotifications",
  async ({ token }: { token: string | undefined }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const url =
        "https://elmadrasah-development-ff14bf466889.herokuapp.com/notify/notification/";
      const config = {
        headers: {
          Authorization: `Token ${token}`,
        },
      };

      const response = await axios.get<TNotificationResponse>(url, config);

      return response.data
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetNotifications;
