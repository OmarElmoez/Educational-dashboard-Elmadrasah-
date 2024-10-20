import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { TLesson } from "@/schemas/LessonSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

type TGetLessonsByStatusParams = {
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
  async ({ status, next }: TGetLessonsByStatusParams, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      let url =
        "/dashboard/lesson/";
      if (next) {
        url = next;
      }

      const response = await axiosInstance.get<TGetLessonsByStatusResponse>(url, {
        params: {
          status,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetLessonsByStatus;
