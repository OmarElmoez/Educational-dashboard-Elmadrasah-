import { TLoading } from "@/types/shared";
import { TCountry } from "@/schemas/CountrySchema";
import { createSlice } from "@reduxjs/toolkit";
import actGetCountries from "./act/actGetCountries";
import { isString } from "@/types/gurads";
import { TCity } from "@/schemas/CitySchema";
import actGetCities from "./act/actGetCities";
import actGetStates from "./act/actGetStates";
import { TState } from "@/schemas/StateSchema";

type TLocationState = {
  countries: TCountry[];
  cities: TCity[];
  states: TState[];
  chosenState: string;
  chosenRegion: string;
  loading: TLoading;
  error: string | null;
};

const initialState: TLocationState = {
  countries: [],
  cities: [],
  states: [],
  chosenState: "",
  chosenRegion: "",
  loading: "idle",
  error: null,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setChosenState: (state, action) => {
      state.chosenState = action.payload;
    },
    setChosenRegion: (state, action) => {
      state.chosenRegion = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(actGetCountries.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actGetCountries.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.countries = action.payload;
      })
      .addCase(actGetCountries.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      });

    builder
      .addCase(actGetCities.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actGetCities.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.cities = action.payload;
      })
      .addCase(actGetCities.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      });

    builder
      .addCase(actGetStates.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actGetStates.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.states = action.payload;
      })
      .addCase(actGetStates.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      });
  },
});

export const { setChosenState, setChosenRegion } = locationSlice.actions;

export { actGetCountries, actGetCities, actGetStates };

export default locationSlice.reducer;
