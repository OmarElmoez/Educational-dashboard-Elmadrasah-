import { TLoading } from "@/types/shared";
import { TCustomer } from "@/types/table";
import { createSlice } from "@reduxjs/toolkit";
import actGetStudents from "./act/actGetStudents";
import { isString } from "@/types/gurads";
import actSearchForTableData from "./act/actSearchForTableData";

type TTableState = {
  students: {
    data: TCustomer[];
    next: string | null;
    previous: string | null;
  };
  loading: TLoading;
  error: string | null;
};

const initialState: TTableState = {
  students: {
    data: [],
    next: null,
    previous: null,
  },
  // Employees: [],
  // Parents: [],
  loading: "idle",
  error: null,
};

const TableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actGetStudents.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })

      .addCase(actGetStudents.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.students.data = action.payload.results;
        state.students.next = action.payload.next;
        state.students.previous = action.payload.previous;
      })

      .addCase(actGetStudents.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      });


    builder
    .addCase(actSearchForTableData.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    })

    .addCase(actSearchForTableData.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.students.data = action.payload.results;
      state.students.next = action.payload.next;
      state.students.previous = action.payload.previous;
    })

    .addCase(actSearchForTableData.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export { actGetStudents };

export default TableSlice.reducer;
