import { TLoading } from "@/types/shared";
import { TQuestion } from "@/schemas/ReviewQuestions";
import { createSlice } from "@reduxjs/toolkit";
import actGetReviewQuestions from "./act/actGetReviewQuestions";
import actPostReviewAnswers from "./act/actPostReviewAnswers";
import { isString } from "@/types/gurads";

type TReviewState = {
  records: TQuestion[];
  loading: TLoading;
  error: string | null;
}

const initialState: TReviewState = {
  records: [],
  loading: "idle",
  error: null,
}

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    setInitialState: (state) => {
      state.loading = "idle"
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetReviewQuestions.pending, (state) => {
      state.loading = "pending"
      state.error = null
    })
    builder.addCase(actGetReviewQuestions.fulfilled, (state, action) => {
      state.loading = "succeeded"
      state.records = action.payload.results
    })
    builder.addCase(actGetReviewQuestions.rejected, (state, action) => {
      state.loading = "failed"
      if (isString(action.payload)) {
        state.error = action.payload
      }
    })

    // post review answers
    builder.addCase(actPostReviewAnswers.pending, (state) => {
      state.loading = "pending"
      state.error = null
    })
    builder.addCase(actPostReviewAnswers.fulfilled, (state) => {
      state.loading = "succeeded"
    })
    builder.addCase(actPostReviewAnswers.rejected, (state, action) => {
      state.loading = "failed"
      if (isString(action.payload)) {
        state.error = action.payload
      }
    })
  },
})

export { actGetReviewQuestions, actPostReviewAnswers }

export const { setInitialState } = reviewSlice.actions

export default reviewSlice.reducer