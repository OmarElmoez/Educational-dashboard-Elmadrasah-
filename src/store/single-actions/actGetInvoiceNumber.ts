import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const actGetInvoiceNumber = createAsyncThunk(
  "single-actions/actGetInvoiceNumber",
  async ({ token }: { token: string | undefined }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const url =
        "https://elmadrasah-development-ff14bf466889.herokuapp.com/customer/invoice/last";
      const config = {
        headers: {
          Authorization: `Token ${token}`,
        },
      };

      const response = await axios.get(url, config);
      return response.data.invoice_number;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetInvoiceNumber;
