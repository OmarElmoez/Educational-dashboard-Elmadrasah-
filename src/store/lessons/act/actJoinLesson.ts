import axiosErrorHandler from "@/utils/axiosErrorHandler";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

type TJoinLesson = {
  attendance_link: string;
  token: string;
};

const actJoinLesson = createAsyncThunk(
  "lessons/actJoinLesson",
  async (
    { attendance_link, token }: TJoinLesson,
    thunkAPI
  ) => {
    const { rejectWithValue } = thunkAPI;
    try {

      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`,
        }
      }

      return await axios.get(attendance_link,
        config)
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }

);

export default actJoinLesson;
