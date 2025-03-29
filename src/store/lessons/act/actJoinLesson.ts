import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance.ts";

type TJoinLesson = {
  attendance_link: string;
};
const actJoinLesson = createAsyncThunk(
  "lessons/actJoinLesson",
  async ({ attendance_link }: TJoinLesson, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axiosInstance.get(attendance_link);
      if (response.status === 200) {
        const redirectUrl = response.data.link;
        if (redirectUrl) {
          window.open(redirectUrl, "_blank");
        }
      }
      return response;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);
export default actJoinLesson;
