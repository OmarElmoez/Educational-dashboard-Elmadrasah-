import { FilterFormData } from "@/pages/admin/lists/balance/FilterForm";
import axiosErrorHandler from "@/utils/axiosErrorHandler";
import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

type TProps = {
  url: string;
  page: number | null;
  searchTerm?: FilterFormData | null;
};


const actGetTableData = () =>
  createAsyncThunk(
    "table/actGetTableData",
    async ({ url, page, searchTerm = null }: TProps, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;

      try {
        if (searchTerm) {
          url += '?';
          if(searchTerm.start_date) url+=`start_date=${searchTerm.start_date }`;
          if(searchTerm.end_date) url+=`&end_date=${searchTerm.end_date }`;
          if(searchTerm.is_active) url+=`&is_active=${searchTerm.is_active }`;
          if(searchTerm.name) url+=`&name=${searchTerm.name }`;

          // url += `?${ searchTerm.start_date ? 'start_date=' searchTerm.start_date : ''}&end_date=${
          //   searchTerm.end_date || ""  // Fixed: was startDate, changed to endDate
          // }&is_active=${searchTerm.is_active || ""}&name=${searchTerm.name}`;
         
         
          // url += `?start_date=${searchTerm.start_date || ""}&end_date=${
          //   searchTerm.end_date || ""  // Fixed: was startDate, changed to endDate
          // }&is_active=${searchTerm.is_active || ""}&name=${searchTerm.name}`;

          url += `&page=${page}`;
        } else {
          url += `?page=${page}`;
        }

        const response = await axiosInstance.get(url);

        return response.data;
      } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
      }
    }
  );

export default actGetTableData;