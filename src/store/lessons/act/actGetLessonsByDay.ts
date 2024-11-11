import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { TLesson } from "@/schemas/LessonSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance.ts";

type TGetLessonsByDayParams = {
  day: string | undefined;
};

type TGetLessonsByDayResponse = {
  result: TLesson[];
};

const actGetLessonsByDay = createAsyncThunk(
  "lessons/actGetLessonsByDay",
  async ({ day }: TGetLessonsByDayParams, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const url = "/dashboard/lesson/";

      const response = await axiosInstance.get<TGetLessonsByDayResponse>(url, {
        params: {
          day,
        },
      });
      return response.data.result;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetLessonsByDay;
