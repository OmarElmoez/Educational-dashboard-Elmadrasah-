import { TFormValuesWithEmail } from "@/pages/login/SetPassword";
import { TUserRole } from "@/types/shared";
import axiosErrorHandler from "@/utils/axiosErrorHandler";
import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

type TSetPassword = {
  message: string;
  user: {
    id: number;
    email: string;
    phone: string;
    first_name: string;
    last_name: string;
    user_type: TUserRole;
    token: string;
  };
};
const actSetPassword = createAsyncThunk(
  "auth/actSetPassword",
  async (formData: TFormValuesWithEmail, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axiosInstance.post<TSetPassword>(
        "/user/set-password/",
        formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actSetPassword;
