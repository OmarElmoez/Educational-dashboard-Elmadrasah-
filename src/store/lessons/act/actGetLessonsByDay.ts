import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { TLesson } from "@/schemas/LessonSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance.ts";

type TGetLessonsByDayParams = {
  date: string | undefined;
  studentId?: number;
};

type TGetLessonsByDayResponse = {
  results: TLesson[];
};

const actGetLessonsByDay = createAsyncThunk(
  "lessons/actGetLessonsByDay",
  async ({ date, studentId }: TGetLessonsByDayParams, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      let url = "/dashboard/lesson/";
      if (studentId) {
        url = `/dashboard/lesson/?student_id=${studentId}`;
      }


      const response = await axiosInstance.get<TGetLessonsByDayResponse>(url, {
        params: {
          date,
        },
      });
      return response.data.results;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetLessonsByDay;
