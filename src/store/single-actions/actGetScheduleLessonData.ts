import { TScheduleLessonResponse } from "@/schemas/getScheduleLessonSchema.ts";
import axiosErrorHandler from "@/utils/axiosErrorHandler";
import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

const actGetScheduleLessonData = createAsyncThunk(
  "single-actions/actGetScheduleLessonData",
  async ({id, credit}: {id: string, credit: string}, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await axiosInstance.get<TScheduleLessonResponse>(
        "/event/customer-answers/?customer_id=" + id + "&credit=" + credit
      );
      return response.data.leadflow_data[0];
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetScheduleLessonData;
