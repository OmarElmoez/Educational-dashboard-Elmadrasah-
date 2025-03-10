import { TLoading } from "@/types/shared";
import { TCustomer, TInvoice } from "@/types/table";
import { createSlice } from "@reduxjs/toolkit";
import actGetStudents from "./act/actGetStudents";
import actGetInvoices from "./act/actGetInvoices";
import actGetAllEmployees from "./act/actGetAllEmployeesData";
import { TEmployeesData } from "@/types/table";
import { isString } from "@/types/gurads";
import actSearchForTableData from "./act/actSearchForTableData";
import actGetSpecificEmployees from "./act/actGetSpecificEmployee";
import { TAddEmployeeFormData } from '@/schemas/AddEmployeeSchema';
// ----------------------------------------------------------
// const getBalanceData = actGetTableData<TBalanceResponse>();

// ----------------------------------------------------------
type TTableState = {
  students: {
    data: TCustomer[];
    next: string | null;
    previous: string | null;
    count: number;
  };
  invoices: {
    data: TInvoice[];
    page: number;
    next: string | null;
    previous: string | null;
  };
  // balance: {
  //   data: TBalance[];
  //   page: number;
  //   next: string | null;
  //   previous: string | null;
  // };
  employees: {
    data: TEmployeesData[];
    page: number;
    next: string | null;
    previous: string | null;
    count: number;
  };
  specificEmployeeData: {
    data: TAddEmployeeFormData;
  }
  loading: TLoading;
  error: string | null;
};

const initialState: TTableState = {
  students: {
    data: [],
    next: null,
    previous: null,
    count: 0,
  },
  invoices: {
    data: [],
    page: 1,
    next: null,
    previous: null,
  },
  // balance: {
  //   data: [],
  //   page: 1,
  //   next: null,
  //   previous: null,
  // },
  // Employees: [],
  // Parents: [],
  employees: {
    data: [],
    page: 1,
    next: null,
    previous: null,
    count: 0,
  },
  specificEmployeeData: {
    data:{} as TAddEmployeeFormData,
  },
  loading: "idle",
  error: null,
};

const TableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    // Add actions for changing pages
    incrementPage(state) {
      if (state.invoices.next) {
        state.invoices.page += 1;
      }
    },
    decrementPage(state) {
      if (state.invoices.previous && state.invoices.page > 0) {
        state.invoices.page -= 1;
      }
    },
    resetPage(state) {
      state.invoices.page = 1;
    },

    // incrementBalancePage(state) {
    //   if (state.balance.next) {
    //     state.balance.page += 1;
    //   }
    // },
    // decrementBalancePage(state) {
    //   if (state.balance.previous && state.balance.page > 0) {
    //     state.balance.page -= 1;
    //   }
    // },
    // resetBalancePage(state) {
    //     state.balance.page = 1;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actGetStudents.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })

      .addCase(actGetStudents.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.students.data = action.payload.results as TCustomer[];
        state.students.next = action.payload.next;
        state.students.previous = action.payload.previous;
        state.students.count = action.payload.count;
      })

      .addCase(actGetStudents.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      })
      .addCase(actGetAllEmployees.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })

      .addCase(actGetAllEmployees.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.employees.data = action.payload.results;
        state.employees.next = action.payload.next;
        state.employees.previous = action.payload.previous;
        state.employees.count = action.payload.count;
      })

      .addCase(actGetAllEmployees.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      })
      .addCase(actGetSpecificEmployees.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })

      .addCase(actGetSpecificEmployees.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.specificEmployeeData.data = action.payload;
      })

      .addCase(actGetSpecificEmployees.rejected, (state, action) => {
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
        const { searchFor, results } = action.payload;
        if (searchFor === "employees") {
          state.employees.data = results.results as TEmployeesData[];
          state.employees.next = results.next;
          state.employees.previous = results.previous;
          state.employees.count = results.count;
        } else if (searchFor === "students") {
          state.students.data = results.results as TCustomer[];
          state.students.next = results.next;
          state.students.previous = results.previous;
        }
      })
      .addCase(actSearchForTableData.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      });

    builder
      .addCase(actGetInvoices.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })

      .addCase(actGetInvoices.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.invoices.data = action.payload.results;
        state.invoices.next = action.payload.next;
        state.invoices.previous = action.payload.previous;
      })

      .addCase(actGetInvoices.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      });
    //  ************************************************

    // builder
    // .addCase(getBalanceData.pending, (state) => {
    //   state.loading = "pending";
    //   state.error = null;
    // })

    // .addCase(getBalanceData.fulfilled, (state, action) => {
    //   state.loading = "succeeded";
    //   state.balance.data = action.payload.results;
    //   state.balance.next = action.payload.next;
    //   state.balance.previous = action.payload.previous;
    // })

    // .addCase(getBalanceData.rejected, (state, action) => {
    //   state.loading = "failed";
    //   if (isString(action.payload)) {
    //     state.error = action.payload;
    //   }
    // });
  },
});

export {
  actGetStudents,
  actGetInvoices,
  // getBalanceData
};
export const {
  incrementPage,
  decrementPage,
  resetPage,
  // incrementBalancePage, decrementBalancePage, resetBalancePage
} = TableSlice.actions;

export default TableSlice.reducer;
