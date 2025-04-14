// // import { TAddStudentFormData } from "@/schemas/AddStudentSchema";
// import { TTableResponse } from "@/types/table";
// import axiosErrorHandler from "@/utils/axiosErrorHandler";
// import axiosInstance from "@/utils/axiosInstance";
// import { createAsyncThunk } from "@reduxjs/toolkit";
//
// type TProps = {
//   next?: string | null;
//   previous?: string | null;
// };
//
// type TResponse = TTableResponse;
//
// const actGetStudents = createAsyncThunk(
//   "table/actGetStudents",
//   async ({ next, previous }: TProps, thunkAPI) => {
//     const { rejectWithValue } = thunkAPI;
//
//     try {
//       let url =
//         "/customer/students/";
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
// export default actGetStudents;
