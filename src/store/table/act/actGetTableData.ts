import { TStatus } from "@/types/Dropdown";
import axiosErrorHandler from "@/utils/axiosErrorHandler";
import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

type TProps<T> = {
  url: string;
  page: number | null;
  searchTerm?: {
    startDate: string;
    endDate: string;
    status: TStatus;
  } | null;
};

const actGetTableData = <T>() =>
  createAsyncThunk(
    "table/actGetTableData",
    async ({ url, page, searchTerm = null }: TProps<T>, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;

      try {
        if (searchTerm) {
          url += `?date=${searchTerm.startDate || ""}&due_date=${
            searchTerm.endDate || ""  // Fixed: was startDate, changed to endDate
          }&status=${searchTerm.status || ""}`;

          url += `&page=${page}`;
        } else {
          url += `?page=${page}`;
        }

        const response = await axiosInstance.get<T>(url);

        return response.data;
      } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
      }
    }
  );

export default actGetTableData;