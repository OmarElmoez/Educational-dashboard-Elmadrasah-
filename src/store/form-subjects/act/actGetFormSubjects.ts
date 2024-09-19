import { TSubject } from "@/types/shared";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";

const actGetFormSubjects = createAsyncThunk(
  "formSubjects/actGetFormSubjects",
  async ({ token }: { token: string | undefined }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const url =
        "https://elmadrasah-development-ff14bf466889.herokuapp.com/employee/subject/";
      const config = {
        headers: {
          Authorization: `Token ${token}`,
        },
      };

      const response = await axios.get<TSubject[]>(url, config);
      const formattedChoices = response.data.map((subject) => {
        return {
          label: subject.name,
          value: subject.id.toString(),
        };
      });

      return formattedChoices;

    } catch (error) {
      return rejectWithValue(isAxiosError(error));
    }
  }
);

export default actGetFormSubjects;
