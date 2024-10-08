import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type TRemovePaymentAllocationProps = {
  id: number | string;
  token: string | undefined;
};

type TRemovePaymentAllocationResponse = {
  message: string;
};

const actRemovePaymentAllocation = createAsyncThunk(
  "invoice/removePaymentAllocation",
  async ({ id, token }: TRemovePaymentAllocationProps, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const url = `https://elmadrasah-development-ff14bf466889.herokuapp.com/customer/payments/remove_payment_allocation/${id}/`;
      const config = {
        headers: {
          Authorization: `Token ${token}`,
        },
      };

      const response = await axios.get<TRemovePaymentAllocationResponse>(
        url,
        config
      );
      if (
        response.data.message !== "Payment allocation removed successfully."
      ) {
        return false;
      }
      return true;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actRemovePaymentAllocation;
