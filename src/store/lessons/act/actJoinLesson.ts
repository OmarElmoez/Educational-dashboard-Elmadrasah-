import axiosErrorHandler from "@/utils/axiosErrorHandler";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance.ts";

type TJoinLesson = {
  attendance_link: string;
};

const actJoinLesson = createAsyncThunk(
  "lessons/actJoinLesson",
  async (
    { attendance_link }: TJoinLesson,
    thunkAPI
  ) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axiosInstance.get(attendance_link);
      return response
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }

);
export default actJoinLesson;
