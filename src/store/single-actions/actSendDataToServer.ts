import {
  POST_END_POINTS,
  TPostEndPoints,
  TPurpose,
} from "@/constants/end-points";
import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type TProps = {
  token: string | undefined;
  hasFiles?: boolean;
  purpose: TPurpose;
  formData: TPostEndPoints[TPurpose]["dataType"] | FormData;
};

const actSendDataToServer = createAsyncThunk(
  "single-actions/actSendDataToServer",
  async ({ token, hasFiles = false, purpose, formData }: TProps, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    if (hasFiles) {
      const validatedFormData = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (
          typeof value === "object" &&
          value !== null &&
          !(value[0] instanceof File)
        ) {
          validatedFormData.append(key, JSON.stringify(value));
        } else if (Array.isArray(value) && value[0] instanceof File) {
          value.forEach((file, index) => {
            validatedFormData.append(`${key}[${index}]`, file);
          });
        } else {
          validatedFormData.append(key, String(value));
        }
      });
      formData = validatedFormData;
    }
    
    try {
      const url = POST_END_POINTS[purpose].url;
      const config = {
        headers: {
          "Content-Type": hasFiles ? "multipart/form-data" : "application/json",
          Authorization: `Token ${token}`,
        },
      };

      const response = await axios.post<TProps["formData"]>(
        url,
        formData,
        config
      );
      console.log("response", response);
      
      return response.data;
    } catch (error: any) {
      console.log("error", error?.response?.data?.detail);
      return rejectWithValue(axiosErrorHandler( error));
    }
  }
);
export default actSendDataToServer;
