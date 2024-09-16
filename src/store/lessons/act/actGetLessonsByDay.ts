import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { TLesson } from "@/schemas/LessonSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type TGetLessonsByDayParams = {
  token: string | undefined;
  from_date: string | undefined;
};

type TGetLessonsByDayResponse = {
  results: TLesson[];
};

const actGetLessonsByDay = createAsyncThunk(
  "lessons/actGetLessonsByDay",
  async ({ token, from_date }: TGetLessonsByDayParams, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const url =
        "https://elmadrasah-development-ff14bf466889.herokuapp.com/dashboard/lesson/";
      const config = {
        headers: {
          Authorization: `Token ${token}`,
        },
        params: {
          from_date,
        },
      };

      const response = await axios.get<TGetLessonsByDayResponse>(url, config);
      return response.data.results;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetLessonsByDay;
