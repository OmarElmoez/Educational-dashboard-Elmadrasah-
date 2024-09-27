 import { TABLE_SEARCH_END_POINTS } from "@/constants";
import { TTableResponse } from "@/types/table";
import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type TSearchProps = {
  searchTerm: string;
  searchFor: keyof typeof TABLE_SEARCH_END_POINTS;
  token: string | undefined;
};

const actSearchForTableData = createAsyncThunk(
  "table/search",
  async (
    { searchTerm, searchFor, token }: TSearchProps,
    thunkAPI
  ) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const url =
        TABLE_SEARCH_END_POINTS[
          searchFor as keyof typeof TABLE_SEARCH_END_POINTS
        ] + searchTerm;

      const config = {
        headers: {
          Authorization: `Token ${token}`,
        },
      };
      const response = await axios.get<TTableResponse>(url, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actSearchForTableData;
