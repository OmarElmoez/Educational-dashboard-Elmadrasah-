import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { TLesson } from "@/schemas/LessonSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

type TGetLessonsByRangeParams = {
  start_date: string;
  end_date: string;
};

type TGetLessonsByRangeResponse = {
  result: TLesson[];
};

const actGetLessonsByRange = createAsyncThunk(
  "lessons/actGetLessonsByRange",
  async ({ start_date, end_date }: TGetLessonsByRangeParams, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const url = "/dashboard/lesson/";

      const response = await axiosInstance.get<TGetLessonsByRangeResponse>(url, {
        params: {
          day: start_date,
          to_day: end_date,
        },
      });
      return response.data.result;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetLessonsByRange;
