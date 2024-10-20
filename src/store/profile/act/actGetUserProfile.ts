import { TUser, TUserStatistics } from "@/types/User";
import axiosErrorHandler from "@/utils/axiosErrorHandler";
import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

type TUserProfileResponse = {
  user: TUser;
  statistics: TUserStatistics;
};

const actGetUserProfile = createAsyncThunk(
  "profile/actGetUserProfile",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const url = "/user/profile/";

      const response = await axiosInstance.get<TUserProfileResponse>(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetUserProfile;
