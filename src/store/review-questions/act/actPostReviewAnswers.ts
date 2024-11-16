
import { TEnteredData } from "@/components/review-form/ReviewForm";
import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance.ts";

const actPostReviewAnswers = createAsyncThunk(
  "review-questions/actPostReviewAnswers",
  async (
    data: {
      lesson: number | undefined;
      questions: TEnteredData[];
    },
    thunkAPI
  ) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const url =
        "/dashboard/review_answer/";

      await axiosInstance.post(url, data);
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actPostReviewAnswers;
