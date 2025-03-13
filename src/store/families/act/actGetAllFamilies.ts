import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { TAllFamiliesData } from "@/types/table";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";
type TProps = {
  next?: string | null;
  previous?: string | null;
};

const actGetAllFamilies = createAsyncThunk(
  "families/getAllFamilies",
  async ({ next, previous }: TProps, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      let url = "/customer/families";
      if (next) {
        url = next;
      }

      if (previous) {
        url = previous;
      }

      const response = await axiosInstance.get<TAllFamiliesData>(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetAllFamilies;
