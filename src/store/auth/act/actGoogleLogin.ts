import { TUserRole } from "@/types/shared";
import axiosErrorHandler from "@/utils/axiosErrorHandler";
import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";


type TGoogleLoginResponse = {
  email: string;
  first_name: string;
  key: string;
  last_name: string;
  message: string;
  phone: string;
  token: string;
  user_type: TUserRole;
};

const actGoogleLogin = createAsyncThunk(
  "auth/actGoogleLogin",
  async (credential: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await axiosInstance.post<TGoogleLoginResponse>(
        "/user/api/auth/google/",
        {
          access_token: credential,
          id_token: credential,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGoogleLogin;
