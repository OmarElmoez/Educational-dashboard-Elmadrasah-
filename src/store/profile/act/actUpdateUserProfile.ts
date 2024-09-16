import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { TProfile } from "@/schemas/ProfileSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const actUpdateUserProfile = createAsyncThunk(
  "profile/actUpdateUserProfile",
  async (
    { formData, token }: { formData: TProfile, token: string | undefined },
    thunkAPI
  ) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const url =
        "https://elmadrasah-development-ff14bf466889.herokuapp.com/user/profile/";

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Token ${token}` 
        }
      };

      await axios.patch(url, formData, config);

    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actUpdateUserProfile;
