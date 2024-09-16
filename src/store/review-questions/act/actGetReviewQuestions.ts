import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { TReviewQuestionsResponse } from "@/schemas";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const actGetReviewQuestions = createAsyncThunk(
  "review-questions/actGetReviewQuestions",
  async (token: string | undefined, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;


    try {
      const url = "https://elmadrasah-development-ff14bf466889.herokuapp.com/dashboard/review_question/";
      const config = {
        headers: {
          Authorization: `Token ${token}`,
        },
      }

      const response = await axios.get<TReviewQuestionsResponse>(url, config);

      return response.data

    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }

  }
);

export default actGetReviewQuestions;
