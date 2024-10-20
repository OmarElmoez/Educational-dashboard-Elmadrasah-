import axiosErrorHandler from "@/utils/axiosErrorHandler";
import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

const actMarkAsRead = createAsyncThunk(
  "notifications/markAsRead",
  async (
    {
      notification_id,
    }: { notification_id: number },
    thunkAPI
  ) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const url = "/notify/notification/";

      await axiosInstance.get(url, {
        params: {
          notification_id,
        },
      });
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actMarkAsRead;
