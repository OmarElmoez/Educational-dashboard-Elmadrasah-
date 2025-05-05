import { TState } from "@/schemas/StateSchema";
import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type TResponse = {
  data: {
    states: TState[];
  };
};

const actGetStates = createAsyncThunk('location/actGetStates', async ({country}: {country: string}, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const url = 'https://countriesnow.space/api/v0.1/countries/states';
    const data = {
      country,
    }
    const response = await axios.post<TResponse>(url, data);
    return response.data.data.states;
  } catch (error) {
    return rejectWithValue(axiosErrorHandler(error));
  }
})

export default actGetStates;