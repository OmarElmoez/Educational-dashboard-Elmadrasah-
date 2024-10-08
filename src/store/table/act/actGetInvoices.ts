import { TStatus } from "@/types/Dropdown";
import { TInvoiceResponse } from "@/types/table";
import axiosErrorHandler from "@/utils/axiosErrorHandler";
import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

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
  async ({  page, searchTerm = null }: TProps, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    let url = "customer/invoices/";

    try {
      if (searchTerm) {
        url += `?date=${searchTerm.startDate || ""}&due_date=${
          searchTerm.startDate || ""
        }&status=${searchTerm.status || ""}`;

        url += `&page=${page}`;
      } else {
        url += `?page=${page}`;
      }

      // const config = {
      //   headers: {
      //     Authorization: `Token ${token}`,
      //   },
      // };

      const response = await axiosInstance.get<TResponse>(url);

      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetInvoices;
