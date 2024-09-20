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

    try {
      const url = POST_END_POINTS[purpose].url;
      const config = {
        headers: {
          "Content-Type": hasFiles ? "multipart/form-data" : "application/json",
          Authorization: `Token ${token}`,
        },
      };

      const response = await axios.post<TProps['formData']>(url, formData, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actSendDataToServer;
