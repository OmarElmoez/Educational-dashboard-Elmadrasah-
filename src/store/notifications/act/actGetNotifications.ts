import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { TNotificationResponse } from "@/schemas";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

const actGetNotifications = createAsyncThunk(
  "notifications/actGetNotifications",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const url =
        "/notify/notification/";

      const response = await axiosInstance.get<TNotificationResponse>(url);

      return response.data
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetNotifications;
