import { TUserRole } from "@/types/shared";
import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { TFormData } from "@/schemas/LoginSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type TAuthLoginResponse = {
  message: string;
  user: {
    id: number;
    email: string;
    phone: string;
    first_name: string;
    last_name: string;
    token: string;
    user_type?: TUserRole;
  }
  set_password_url?: string;
  modified_email?: string;
};

const actAuthLogin = createAsyncThunk(
  "auth/actAuthLogin",
  async (formData: TFormData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await axios.post<TAuthLoginResponse>(
        "https://elmadrasah-development-ff14bf466889.herokuapp.com/user/login/",
        formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actAuthLogin;
