import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { TLesson } from "@/schemas/LessonSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type TGetLessonsByRangeParams = {
  token: string | undefined;
  start_date: string;
  end_date: string;
};

type TGetLessonsByRangeResponse = {
  results: TLesson[];
};

const actGetLessonsByRange = createAsyncThunk(
  "lessons/actGetLessonsByRange",
  async (
    { token, start_date, end_date }: TGetLessonsByRangeParams,
    thunkAPI
  ) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const url =
        "https://elmadrasah-development-ff14bf466889.herokuapp.com/dashboard/lesson/";
      const config = {
        headers: {
          Authorization: `Token ${token}`,
        },
        params: {
          day: start_date,
          to_day: end_date,
        },
      };

      const response = await axios.get<TGetLessonsByRangeResponse>(url, config);
      return response.data.results;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetLessonsByRange;
