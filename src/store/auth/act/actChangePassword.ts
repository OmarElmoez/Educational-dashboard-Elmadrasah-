import axiosErrorHandler from "@/utils/axiosErrorHandler";
import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

type TPasswordChange = {
  old_password: string;
  new_password: string;
  confirm_new_password: string;
};

const actChangePassword = createAsyncThunk(
  "auth/actChangePassword",
  async (formData: TPasswordChange, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const url = "/user/change_password/";
      const data = {
        old_password: formData.old_password,
        new_password: formData.new_password,
        confirm_new_password: formData.confirm_new_password,
      };
      const response = await axiosInstance.patch(url, data);
      if (response.status === 201) {
        return response.data;
      }

      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actChangePassword;
