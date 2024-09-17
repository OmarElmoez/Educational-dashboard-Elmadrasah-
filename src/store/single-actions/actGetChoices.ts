import { TStudent, TSubject } from "@/types/shared";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";

type TSubjectsResponse = TSubject[];
type TStudentsResponse = TStudent[];

export type TResponse = TSubjectsResponse | TStudentsResponse;

type TProps = {
  token: string | undefined;
  url: string;
};

const actGetChoices = createAsyncThunk(
  "actGetSubjects",
  async (
    {
      token,
      url,
    }: TProps,
    thunkAPI
  ) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const endPoint = url;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      };
      const response = await axios.get<TResponse>(endPoint, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(isAxiosError(error));
    }
  }
);

export default actGetChoices;
