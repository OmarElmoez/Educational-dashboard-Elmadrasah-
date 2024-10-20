import { TPhone } from "@/pages/login/PhoneNumber";
import axiosErrorHandler from "@/utils/axiosErrorHandler";
import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";


const actUpdatePhone = createAsyncThunk("auth/actUpdatePhone", async (formData: TPhone, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;

  try {
    const url = '/user/profile/';
    const data = {
      phone: formData.phoneNumber,
    };
    // const config = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Token ${formData.token}` 
    //   }
    // };

    const response = await axiosInstance.patch(url, data);
    
    return response.data;
  } catch (error) {
    return rejectWithValue(axiosErrorHandler(error));
  }
});

export default actUpdatePhone;