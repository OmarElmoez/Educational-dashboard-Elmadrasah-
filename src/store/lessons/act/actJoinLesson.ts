import axiosErrorHandler from "@/utils/axiosErrorHandler";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance.ts";

type TJoinLesson = {
  attendance_link: string;
};

// @ts-ignore
const actJoinLesson = createAsyncThunk(
  "lessons/actJoinLesson",
  async (
    { attendance_link }: TJoinLesson,
    thunkAPI
  ) => {
    const { rejectWithValue } = thunkAPI;
    try {
      return await axiosInstance.get(attendance_link);
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }

);

export default actJoinLesson;
