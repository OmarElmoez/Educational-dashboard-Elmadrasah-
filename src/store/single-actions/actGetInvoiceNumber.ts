import axiosErrorHandler from "@/utils/axiosErrorHandler";
import axiosInstance from "@/utils/axiosInstance";
import {createAsyncThunk} from "@reduxjs/toolkit";

const actGetData = createAsyncThunk(
  "single-actions/actGetData",
  async (
    {endpoint, params}: { endpoint: string; params?: {} },
    thunkAPI
  ) => {
    const {rejectWithValue} = thunkAPI;

    const config = {
      params,
    }

    try {
      const response = await axiosInstance.get(endpoint, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetData;
