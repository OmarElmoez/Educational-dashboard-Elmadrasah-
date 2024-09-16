import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { TLesson } from "@/schemas/LessonSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type TGetLessonsByStatusParams = {
  token: string | undefined;
  status: string | undefined;
  next?: string | null;
};

type TGetLessonsByStatusResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: TLesson[];
};

const actGetLessonsByStatus = createAsyncThunk(
  "lessons/actGetLessonsByStatus",
  async ({ token, status, next }: TGetLessonsByStatusParams, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      let url =
        "https://elmadrasah-development-ff14bf466889.herokuapp.com/dashboard/lesson/";
      if (next) {
        url = next;
      }
      const config = {
        headers: {
          Authorization: `Token ${token}`,
        },
        params: {
          status,
        },
      };

      const response = await axios.get<TGetLessonsByStatusResponse>(url, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetLessonsByStatus;
