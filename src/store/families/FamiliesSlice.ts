import { TLoading } from "@/types/shared";
import { createSlice } from "@reduxjs/toolkit";
import actGetAllFamilies from "./act/actGetAllFamilies";
import { isString } from "@/types/gurads";
import { TAllFamiliesData } from "@/types/table";

type TFamiliesState = {
  allFamiliesData: TAllFamiliesData[];
  loading: TLoading;
  error: string | null;
};

const initialState: TFamiliesState = {
  allFamiliesData: [],
  loading: "idle",
  error: null,
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
        state.allFamiliesData = action.payload
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
