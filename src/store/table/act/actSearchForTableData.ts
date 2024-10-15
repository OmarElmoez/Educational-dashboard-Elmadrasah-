 import { TABLE_SEARCH_END_POINTS } from "@/constants";
import { TTableResponse } from "@/types/table";
import axiosErrorHandler from "@/utils/axiosErrorHandler";
import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

type TSearchProps = {
  searchTerm: string;
  searchFor: keyof typeof TABLE_SEARCH_END_POINTS;
};

const actSearchForTableData = createAsyncThunk(
  "table/search",
  async (
    { searchTerm, searchFor }: TSearchProps,
    thunkAPI
  ) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const url =
        TABLE_SEARCH_END_POINTS[
          searchFor as keyof typeof TABLE_SEARCH_END_POINTS
        ] + searchTerm;

      const response = await axiosInstance.get<TTableResponse>(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actSearchForTableData;
