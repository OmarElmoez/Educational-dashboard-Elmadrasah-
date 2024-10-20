import axiosErrorHandler from "@/utils/axiosErrorHandler";
import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

type TNewSubject = {
  name_ar: string;
  name_en: string;
};

const actPostNewSubject = createAsyncThunk(
  "subjects/postNewSubject",
  async ({ data }: { data: TNewSubject }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const url = "/employee/subject/";

      const response = await axiosInstance.post(url, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actPostNewSubject;
