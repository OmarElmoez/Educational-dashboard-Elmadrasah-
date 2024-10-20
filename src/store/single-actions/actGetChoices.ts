import { TResponseOption } from "@/types/shared";
import axiosErrorHandler from "@/utils/axiosErrorHandler";
import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export type TResponse = TResponseOption[];

type TProps = {
  url: string;
};

const actGetChoices = createAsyncThunk(
  "actGetSubjects",
  async ({ url }: TProps, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const endPoint = url;

      const response = await axiosInstance.get<TResponse>(endPoint);
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetChoices;
