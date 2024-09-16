import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";

const actGetSubjects = createAsyncThunk(
  "actGetSubjects",
  async ({ token }: { token: string | undefined }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const url =
        "https://elmadrasah-development-ff14bf466889.herokuapp.com/employee/subject/";
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      };
      const response = await axios.get(url, config);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(isAxiosError(error));
    }
  }
);

export default actGetSubjects;
