import {DROPDOWN_END_POINTS, TOptionsFor} from "@/constants/end-points";
import {TResponseOption} from "@/types/shared";
import axiosErrorHandler from "@/utils/axiosErrorHandler";
import axiosInstance from "@/utils/axiosInstance";
import {createAsyncThunk} from "@reduxjs/toolkit";
// import axios from "axios";

type TResponse = TResponseOption[];

type TActGetDropdownOptionsProps = {
  optionsFor: TOptionsFor;
  searchQuery?: string;
};

const actGetDropdownOptions = createAsyncThunk(
  "getDropdownOptions",
  async ({ optionsFor, searchQuery }: TActGetDropdownOptionsProps, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      let url = DROPDOWN_END_POINTS[optionsFor];
      if (optionsFor !== 'locations' && searchQuery !== '') {
        url = `${DROPDOWN_END_POINTS[optionsFor]}&first_name=${searchQuery}`;
      }

      if (optionsFor === 'locations' && searchQuery !== '') {
        url = `${DROPDOWN_END_POINTS[optionsFor]}&search=${searchQuery}`;
      }

      const response = await axiosInstance.get<TResponse>(url);

      return response.data.map((option) => {
          return {
              label: option.name,
              value: option.id.toString(),
          };
      });
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetDropdownOptions;
