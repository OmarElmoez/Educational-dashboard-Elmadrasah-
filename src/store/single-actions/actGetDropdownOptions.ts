import { DROPDOWN_END_POINTS, TOptionsFor } from "@/constants/end-points";
import { TResponseOption } from "@/types/shared";
import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type TResponse = TResponseOption[];

type TActGetDropdownOptionsProps = {
  token: string | undefined;
  optionsFor: TOptionsFor;
};

const actGetDropdownOptions = createAsyncThunk(
  "getDropdownOptions",
  async ({ token, optionsFor }: TActGetDropdownOptionsProps, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const url = DROPDOWN_END_POINTS[optionsFor];
      const config = {
        headers: {
          Authorization: `Token ${token}`,
        },
      };

      const response = await axios.get<TResponse>(url, config);

      const formattedOptions = response.data.map((option) => {
        return {
          label: option.name,
          value: option.id.toString(),
        };
      });

      return formattedOptions;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetDropdownOptions;
