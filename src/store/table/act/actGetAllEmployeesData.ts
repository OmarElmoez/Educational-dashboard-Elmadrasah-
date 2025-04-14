// import { TAllEmployeesData } from "@/types/table";
// import axiosErrorHandler from "@/utils/axiosErrorHandler";
// import axiosInstance from "@/utils/axiosInstance";
// import { createAsyncThunk } from "@reduxjs/toolkit";
//
// type TProps = {
//   next?: string | null;
//   previous?: string | null;
// };
//
// type TResponse = TAllEmployeesData;
//
// const actGetAllEmployees = createAsyncThunk(
//   "table/actGetEmployees",
//   async ({ next, previous }: TProps, thunkAPI) => {
//     const { rejectWithValue } = thunkAPI;
//
//     try {
//       let url =
//         "/employee/modify/";
//       if (next) {
//         url = next;
//       }
//
//       if (previous) {
//         url = previous;
//       }
//
//       const response = await axiosInstance.get<TResponse>(url);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(axiosErrorHandler(error));
//     }
//   }
// );
//
// export default actGetAllEmployees;