import { TResponseOption } from "@/types/shared";
import axiosErrorHandler from "@/utils/axiosErrorHandler";
import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

const actGetFormSubjects = createAsyncThunk(
  "formSubjects/actGetFormSubjects",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const url = "/employee/subject/";

      const response = await axiosInstance.get<TResponseOption[]>(url);
      const formattedChoices = response.data.map((subject) => {
        return {
          label: subject.name,
          value: subject.id.toString(),
        };
      });

      return formattedChoices;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetFormSubjects;
