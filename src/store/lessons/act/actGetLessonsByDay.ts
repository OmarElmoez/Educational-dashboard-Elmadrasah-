import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { TLesson } from "@/schemas/LessonSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type TGetLessonsByDayParams = {
  from_date: string | undefined;
};

type TGetLessonsByDayResponse = {
  results: TLesson[];
};

const actGetLessonsByDay = createAsyncThunk(
  "lessons/actGetLessonsByDay",
  async ({ from_date }: TGetLessonsByDayParams, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const url = "/dashboard/lesson/";

      const response = await axios.get<TGetLessonsByDayResponse>(url, {
        params: {
          from_date,
        },
      });
      return response.data.results;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetLessonsByDay;
