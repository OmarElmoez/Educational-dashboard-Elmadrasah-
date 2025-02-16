import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance.ts";
import { TLessonsForEachHour } from "../TabsSlice.ts";
import axiosErrorHandler from "@/utils/axiosErrorHandler.ts";

const actGetAllHoursData = createAsyncThunk("get all hours data", async ({studentId, day}: {studentId?: number, day?: string}, thunkAPI) => {
  const {rejectWithValue} = thunkAPI;

  try {
    let url = '/event/shared-lessons/lessons-by-hour/';
    if (studentId) {
      url = `/event/shared-lessons/lessons-by-hour/?student_id=${studentId}/`
    }
    if (day) {
      url = `/event/shared-lessons/lessons-by-hour/?day=${day}`
    }
    const response = await axiosInstance.get<TLessonsForEachHour>(url);
    return response.data;
  } catch (error) {
    return rejectWithValue(axiosErrorHandler(error))
  }
})

export default actGetAllHoursData;