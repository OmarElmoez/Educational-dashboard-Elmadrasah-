import { TLoading } from "@/types/shared";
import { createSlice } from "@reduxjs/toolkit";
import actGetAllFamilies from "./act/actGetAllFamilies";
import { isString } from "@/types/gurads";
import { TFamilyData } from "@/types/table";

type TFamiliesState = {
  families: {
    familiesData: TFamilyData[];
    next: string | null;
    previous: string | null;
    count: number;
  };
  loading: TLoading;
  error: string | null;
};

const initialState: TFamiliesState = {
  families: {
    familiesData: [],
    next: null,
    previous: null,
    count: 0,
  },
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
        state.families.familiesData = action.payload.results;
        state.families.next = action.payload.next;
        state.families.previous = action.payload.previous;
        state.families.count = action.payload.count;
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
