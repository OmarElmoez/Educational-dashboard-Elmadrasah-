import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { TReviewQuestionsResponse } from "@/schemas";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

const actGetReviewQuestions = createAsyncThunk(
  "review-questions/actGetReviewQuestions",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const url = "/dashboard/review_question/";

      const response = await axiosInstance.get<TReviewQuestionsResponse>(url);

      return response.data

    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }

  }
);

export default actGetReviewQuestions;
