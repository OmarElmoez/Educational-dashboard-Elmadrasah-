import axiosErrorHandler from "@/utils/axiosErrorHandler";
import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

const actGetData = createAsyncThunk(
  "single-actions/actGetData",
  async (
    { endpoint, params = null }: { endpoint: string; params?: {} | null },
    thunkAPI
  ) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const url = endpoint;
      let response;
      if (params) {
        response = await axiosInstance.get(url, { params });
      }
      response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetData;
