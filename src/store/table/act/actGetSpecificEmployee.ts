import axiosErrorHandler from "@/utils/axiosErrorHandler";
import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TAddEmployeeFormData } from '@/schemas/AddEmployeeSchema';

type TProps = {
  employeeID?: number | null;
};

type TResponse = TAddEmployeeFormData;

const actGetSpecificEmployees = createAsyncThunk(
  "table/actGetSpecificEmployeebyid",
  async ({ employeeID }: TProps, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await axiosInstance.get<TResponse>(`/employee/modify/${employeeID}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetSpecificEmployees;