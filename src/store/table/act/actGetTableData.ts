import { FilterFormData } from "@/pages/admin/lists/balance/FilterForm";
import axiosErrorHandler from "@/utils/axiosErrorHandler";
import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

type TProps<T> = {
  url: string;
  page: number | null;
  searchTerm?: FilterFormData | null;
};


const actGetTableData = <T>() =>
  createAsyncThunk(
    "table/actGetTableData",
    async ({ url, page, searchTerm = null }: TProps<T>, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;

      try {
        if (searchTerm) {
          url += `?start_date=${searchTerm.start_date || ""}&end_date=${
            searchTerm.end_date || ""  // Fixed: was startDate, changed to endDate
          }&is_active=${searchTerm.is_active || ""}&name=${searchTerm.name}`;

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