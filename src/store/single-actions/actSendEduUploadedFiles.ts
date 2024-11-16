import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosErrorHandler from "@/utils/axiosErrorHandler.ts";
import axiosInstance from "@/utils/axiosInstance.ts";
import {TSubmittedData} from "@/components/tabs/sub-components/upload-files/upload-form/UploadEduFilesForm.tsx";

const actSendEduUploadedFiles = createAsyncThunk("single-actions/send education files",
  async ({classId, data}: { classId: string, data: TSubmittedData | FormData }, thunkAPI) => {
    const {rejectWithValue} = thunkAPI

    try {
      const url = `/event/lessons/${classId}/files/upload_multiple/`;

      const config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }

      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value) && value[0] instanceof File) {
          value.forEach((file) => {
            formData.append(`${key}`,
              file);
          });
        } else {
          formData.append(key,
            String(value));
        }
      })
      const res = await axiosInstance.post(url,
        formData,
        config);
      return res.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error))
    }
  })

export default actSendEduUploadedFiles;