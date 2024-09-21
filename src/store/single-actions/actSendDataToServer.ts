import { POST_END_POINTS, TPostEndPoints, TPurpose } from "@/constants/end-points";
import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type TProps = {
  token: string | undefined;
  hasFiles?: boolean;
  purpose: TPurpose;
  formData: TPostEndPoints[TPurpose]['dataType'];
}

const actSendDataToServer = createAsyncThunk(
  "single-actions/actSendDataToServer",
  async ({token, hasFiles = false, purpose, formData}: TProps, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    let data: FormData | object;

      if (hasFiles) {
        data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          if (data instanceof FormData) {
            if (Array.isArray(value)) {
              data.append(key, JSON.stringify(value));
            } else if (value instanceof File) {
              data.append(key, value);
            } else {
              data.append(key, String(value));
            }
          }
        });
      } else {
        data = formData;
      }

    try {
      const url = POST_END_POINTS[purpose].url;
      const config = {
        headers: {
          "Content-Type": hasFiles ? "multipart/form-data" : "application/json",
          Authorization: `Token ${token}`,
        },
      };

      const response = await axios.post<TProps['formData']>(url, data, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actSendDataToServer;
