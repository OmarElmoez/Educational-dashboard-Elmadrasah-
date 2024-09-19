import { TOption } from "@/types/Dropdown";
import { TLoading } from "@/types/shared";
import { createSlice } from "@reduxjs/toolkit";
import actGetFormSubjects from "./act/actGetFormSubjects";
import actPostNewSubject from "./act/actPostNewSubject";
import { isString } from "@/types/gurads";

type TFormSubjectsInitailState = {
  subjects: TOption[];
  loading: TLoading;
  error: string | null;
};

const initialState: TFormSubjectsInitailState = {
  subjects: [],
  loading: "idle",
  error: null,
};

const formSubjectsSlice = createSlice({
  name: "formSubjects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actGetFormSubjects.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actGetFormSubjects.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.subjects = action.payload;
      })
      .addCase(actGetFormSubjects.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      });

    builder
    .addCase(actPostNewSubject.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
    .addCase(actPostNewSubject.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(actPostNewSubject.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      });
  },
});

export { actGetFormSubjects, actPostNewSubject };

export default formSubjectsSlice.reducer;
