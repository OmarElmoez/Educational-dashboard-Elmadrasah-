import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

export type TVerifingFiles = {
  action: string;
  file_id: number;
};
const actVerifingFiles = createAsyncThunk(
  "verifingFiles/actVerifingFiles",
  async (verifingData: TVerifingFiles, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const url = "/event/inbox/";

      const response = await axiosInstance.post(url, verifingData);

      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actVerifingFiles;
