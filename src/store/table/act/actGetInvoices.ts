import { TStatus } from "@/types/Dropdown";
import { TInvoiceResponse } from "@/types/table";
import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type TProps = {
  token: string | undefined;
  page: number | null;
  searchTerm?: {
    startDate: string;
    endDate: string;
    status: TStatus;
  } | null;
};

type TResponse = TInvoiceResponse;

const actGetInvoices = createAsyncThunk(
  "table/actGetInvoices",
  async ({ token, page, searchTerm = null }: TProps, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    let url =
      "https://elmadrasah-development-ff14bf466889.herokuapp.com/customer/invoices/";

    try {
      if (searchTerm) {
        url += `?date=${searchTerm.startDate || ""}&due_date=${
          searchTerm.startDate || ""
        }&status=${searchTerm.status || ""}`;

        url += `&page=${page}`;
      } else {
        url += `?page=${page}`;
      }

      const config = {
        headers: {
          Authorization: `Token ${token}`,
        },
      };

      const response = await axios.get<TResponse>(url, config);

      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetInvoices;
