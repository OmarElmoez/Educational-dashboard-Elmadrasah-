import { TLoading } from "@/types/shared";
import { createSlice } from "@reduxjs/toolkit";
import actGetAllFamilies from "./act/actGetAllFamilies";
import { isString } from "@/types/gurads";
import { TFamilyData } from "@/types/table";

type TFamiliesState = {
  familiesData: TFamilyData[];
  loading: TLoading;
  error: string | null;
  next: string | null;
  previous: string | null;
};

const initialState: TFamiliesState = {
  familiesData: [],
  loading: "idle",
  error: null,
  next: null,
  previous: null,
};

const familiesSlice = createSlice({
  name: "families",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actGetAllFamilies.pending, (state) => {
        state.loading = "pending"
        state.error = null
      })
  
      builder.addCase(actGetAllFamilies.fulfilled, (state, action) => {
        state.loading = "succeeded"
        state.familiesData = action.payload.results;
        state.next = action.payload.next;
        state.previous = action.payload.previous;
      })
  
      builder.addCase(actGetAllFamilies.rejected, (state, action) => {
        state.loading = "failed"
        if (isString(action.payload)) {
          state.error = action.payload
        }
      })
  },
});


export { actGetAllFamilies };

export default familiesSlice.reducer;
