import {createAsyncThunk} from "@reduxjs/toolkit";
import {TScheduleLessonFormDataForServer} from "@/schemas/postScheduleLessonSchema.ts";
import axiosErrorHandler from "@/utils/axiosErrorHandler.ts";
import axiosInstance from "@/utils/axiosInstance.ts";

const actSendScheduleLessonData = createAsyncThunk("single-actions/sendScheduleLessonData", async (data: TScheduleLessonFormDataForServer, thunkAPI) => {
  const {rejectWithValue} = thunkAPI;

  try {
    const url = "event/lessons/";
    await axiosInstance.post<TScheduleLessonFormDataForServer>(url, data)
  } catch (e) {
    return rejectWithValue(axiosErrorHandler(e))
  }
})

export default actSendScheduleLessonData;