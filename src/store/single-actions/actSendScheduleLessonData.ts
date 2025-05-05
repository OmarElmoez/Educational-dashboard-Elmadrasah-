import { createAsyncThunk } from "@reduxjs/toolkit";
import { TScheduleLessonFormDataForServer } from "@/schemas/postScheduleLessonSchema.ts";
import axiosErrorHandler from "@/utils/axiosErrorHandler.ts";
import axiosInstance from "@/utils/axiosInstance.ts";
import { TPostResponse } from "@/types/shared";

const actSendScheduleLessonData = createAsyncThunk("single-actions/sendScheduleLessonData",
  async (data: TScheduleLessonFormDataForServer, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;

    try {
      const url = "event/lessons/";
      const res = await axiosInstance.post<TPostResponse>(url, data)
      return res.data || res
    } catch (e) {
      return rejectWithValue(axiosErrorHandler(e))
    }
  })

export default actSendScheduleLessonData;