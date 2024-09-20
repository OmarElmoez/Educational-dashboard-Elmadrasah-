import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type TNewSubject = {
  name_ar: string;
  name_en: string;
};

const actPostNewSubject = createAsyncThunk(
  "subjects/postNewSubject",
  async ({ token, data }: { token: string | undefined, data: TNewSubject }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const url =
        "https://elmadrasah-development-ff14bf466889.herokuapp.com/employee/subject/";
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      };

      const response = await axios.post(url, data, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actPostNewSubject;
