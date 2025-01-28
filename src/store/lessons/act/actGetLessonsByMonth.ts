import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { TLesson } from "@/schemas/LessonSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance.ts";

type TGetLessonsByMonthParams = {
  date: string | undefined;
  studentId?: number;
};

type TGetLessonsByMonthResponse = {
  results: TLesson[];
};

const actGetLessonsByMonth = createAsyncThunk(
  "lessons/actGetLessonsByMonth",
  async ({ date, studentId }: TGetLessonsByMonthParams, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      let url = "/dashboard/lesson/";
      if (studentId) {
        url = `/dashboard/lesson/?student_id=${studentId}/`;
      }


      const response = await axiosInstance.get<TGetLessonsByMonthResponse>(url, {
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

export default actGetLessonsByMonth;
