import axiosErrorHandler from "@/utils/axiosErrorHandler";
import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

type TRemovePaymentAllocationProps = {
  id: number | string;
};

type TRemovePaymentAllocationResponse = {
  message: string;
};

const actRemovePaymentAllocation = createAsyncThunk(
  "invoice/removePaymentAllocation",
  async ({ id}: TRemovePaymentAllocationProps, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const url = `/customer/payments/remove_payment_allocation/${id}/`;

      const response = await axiosInstance.get<TRemovePaymentAllocationResponse>(
        url,
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
