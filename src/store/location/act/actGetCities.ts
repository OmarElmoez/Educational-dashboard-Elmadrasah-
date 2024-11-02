import { TCity } from "@/schemas/CitySchema";
import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type TResponse = {
  geonames: TCity[];
};

const actGetCities = createAsyncThunk(
  "location/actGetStatesAndCities",
  async ({ countryCode }: { countryCode: string }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await axios.get<TResponse>(
        `http://api.geonames.org/searchJSON?country=${countryCode}&featureClass=P&maxRows=250&username=omarelmoez`
      );

      return response.data.geonames;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetCities;
