import { TResponseOption } from "@/types/shared";
import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export type TResponse = TResponseOption[];

type TProps = {
  token: string | undefined;
  url: string;
};

const actGetChoices = createAsyncThunk(
  "actGetSubjects",
  async ({ token, url }: TProps, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const endPoint = url;
      const config = {
        headers: {
          Authorization: `Token ${token}`,
        },
      };
      const response = await axios.get<TResponse>(endPoint, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetChoices;
