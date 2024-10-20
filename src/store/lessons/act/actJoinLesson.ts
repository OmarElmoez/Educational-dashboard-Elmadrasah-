import axiosErrorHandler from "@/utils/axiosErrorHandler";
import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

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
      let url = attendance_link;

      const response = await axiosInstance.get(url);
      return response.data
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }

);

export default actJoinLesson;
