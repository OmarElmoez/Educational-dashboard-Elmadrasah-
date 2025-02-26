import {
  POST_END_POINTS,
  TPostEndPoints,
  TPurpose,
} from "@/constants/end-points";
import axiosErrorHandler from "@/utils/axiosErrorHandler";
import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

type TProps = {
  hasFiles?: boolean;
  purpose: TPurpose;
  formData: TPostEndPoints[TPurpose]["dataType"] | FormData;
  isEdit?:boolean;
  id?:number | string;
};

const actSendDataToServer = createAsyncThunk(
  "single-actions/actSendDataToServer",
  async ({  hasFiles = false, purpose, formData, isEdit, id }: TProps, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    if (hasFiles) {
      const validatedFormData = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (
          Array.isArray(value) &&
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

      let response; 

      if (isEdit) {
         response = await axiosInstance.patch(url + id + '/', formData, {
          headers: {
            "Content-Type": hasFiles ? "multipart/form-data" : "application/json",
          },
         });
      } else {
         response = await axiosInstance.post(url, formData, {
          headers: {
            "Content-Type": hasFiles ? "multipart/form-data" : "application/json",
          },
         });
      }

      return response.data || response;
    } catch (error: any) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);
export default actSendDataToServer;