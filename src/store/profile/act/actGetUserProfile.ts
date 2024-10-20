import { TUser, TUserStatistics } from "@/types/User";
import axiosErrorHandler from "@/utils/axiosErrorHandler";
import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type TUserProfileResponse = {
  user: TUser,
  statistics: TUserStatistics
}

const actGetUserProfile = createAsyncThunk(
  "profile/actGetUserProfile",
  async ( _, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const url =
        "/user/profile/";
      // const config = {
      //   headers: {
      //     Authorization: `Token ${token}`,
      //   },
      // };
      const response = await axiosInstance.get<TUserProfileResponse>(url);      
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetUserProfile;
