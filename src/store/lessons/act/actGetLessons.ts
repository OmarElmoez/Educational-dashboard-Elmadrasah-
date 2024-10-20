import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  TAdminResponse,
  TStudentResponse,
  TFamilyResponse,
  TTeacherResponse,
} from "@/schemas";
import axiosInstance from "@/utils/axiosInstance";

type TLessonsResponse =
  | TAdminResponse
  | TStudentResponse
  | TFamilyResponse
  | TTeacherResponse;

type TGetLessonsPrams = {
  token: string | undefined;
  from_date?: string | undefined;
  next?: string | null;
};

const actGetLessons = createAsyncThunk(
  "lessons/actGetLessons",
  async ({ next }: TGetLessonsPrams, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      let url =
        "/dashboard/lesson/";
      if (next) {
        url = next;
      }
      const response = await axiosInstance.get<TLessonsResponse>(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetLessons;
