import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { TProfile } from "@/schemas/ProfileSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

const actUpdateUserProfile = createAsyncThunk(
  "profile/actUpdateUserProfile",
  async (
    { formData}: { formData: TProfile},
    thunkAPI
  ) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const url = "/user/profile/";

      await axiosInstance.patch(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actUpdateUserProfile;
