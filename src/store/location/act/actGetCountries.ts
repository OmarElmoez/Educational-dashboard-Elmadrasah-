import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { TCountry } from "@/schemas/CountrySchema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const actGetCountries = createAsyncThunk('location/actGetCountries', async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;

  try {
    const response = await axios.get<TCountry[]>('https://restcountries.com/v3.1/all');
    return response.data;
  } catch (error) {
    return rejectWithValue(axiosErrorHandler(error))
  }
})

export default actGetCountries;