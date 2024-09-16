import { TState } from "@/schemas/StateSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";

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
    return rejectWithValue(isAxiosError(error));
  }
})

export default actGetStates;