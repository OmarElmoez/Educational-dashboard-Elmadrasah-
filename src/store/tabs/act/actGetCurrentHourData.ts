import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance.ts";
import { TLessonForCurrentHour } from "../TabsSlice.ts";
import axiosErrorHandler from "@/utils/axiosErrorHandler.ts";

const actGetCurrentHourData =  createAsyncThunk("get current hour data", async ({studentId}: {studentId?: number}, thunkAPI) => {
  const {rejectWithValue} = thunkAPI

  try {
    let url = "/event/shared-lessons/current-lesson/"
    if (studentId) {
      url = `/event/shared-lessons/current-lesson/?student_id=${studentId}/`
    }
    const response = await axiosInstance.get<TLessonForCurrentHour>(url);
    return response.data;
  } catch (error) {
    return rejectWithValue(axiosErrorHandler(error))
  }
})

export default actGetCurrentHourData;