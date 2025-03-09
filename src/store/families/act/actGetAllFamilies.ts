import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { TAllFamiliesData } from "@/types/table";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";


const actGetAllFamilies = createAsyncThunk('families/getAllFamilies', async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;

  try {
    const response = await axiosInstance.get<TAllFamiliesData>('/customer/families');
    return response.data;
  } catch (error) {
    return rejectWithValue(axiosErrorHandler(error))
  }
})

export default actGetAllFamilies;