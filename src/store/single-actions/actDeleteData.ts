import { createAsyncThunk } from "@reduxjs/toolkit";
// import axiosErrorHandler from "@/utils/axiosErrorHandler";
import axiosInstance from "@/utils/axiosInstance";

interface DeleteDataResponse {
  success: boolean;
  message: string;
}

const actDeleteData = createAsyncThunk<
  DeleteDataResponse,
  { endpoint: string },
  { rejectValue: string }
>(
  "single-actions/actDeleteData",
  async ({ endpoint }, thunkAPI) => {

    const url = endpoint;

    try {
      const response = await axiosInstance.delete(url);
      return response.data;
    } catch (error: any) {

      return thunkAPI.rejectWithValue(error?.message || "Something went wrong!");
    }
  }
);

export default actDeleteData;