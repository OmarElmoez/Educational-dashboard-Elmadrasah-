// import { TAddStudentFormData } from "@/schemas/AddStudentSchema";
import { TTableResponse } from "@/types/table";
import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type TProps = {
  token: string | undefined;
  next?: string | null;
  previous?: string | null;
};

type TResponse = TTableResponse;

const actGetStudents = createAsyncThunk(
  "table/actGetStudents",
  async ({ token, next, previous }: TProps, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      let url =
        "https://elmadrasah-development-ff14bf466889.herokuapp.com/customer/students/";
      if (next) {
        url = next;
      }

      if (previous) {
        url = previous;
      }
      const config = {
        headers: {
          Authorization: `Token ${token}`,
        },
      };
      const response = await axios.get<TResponse>(url, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetStudents;
