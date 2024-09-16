import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import {
  TAdminResponse,
  TStudentResponse,
  TFamilyResponse,
  TTeacherResponse,
} from "@/schemas";

type TLessonsResponse =
  | TAdminResponse
  | TStudentResponse
  | TFamilyResponse
  | TTeacherResponse;

type TGetLessonsPrams = {
  token: string | undefined;
  from_date?: string | undefined;
  next?: string | null;
}


const actGetLessons = createAsyncThunk('lessons/actGetLessons', async ({token, next}: TGetLessonsPrams, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;

  try {
    let url = 'https://elmadrasah-development-ff14bf466889.herokuapp.com/dashboard/lesson/';
    if (next) {
      url = next;
    }
    const config = {
      headers: {
        'Authorization': `Token ${token}`
      }
    };
    const response = await axios.get<TLessonsResponse>(url, config);
    return response.data
  } catch (error) {
    return rejectWithValue(axiosErrorHandler(error));
  }
});

export default actGetLessons