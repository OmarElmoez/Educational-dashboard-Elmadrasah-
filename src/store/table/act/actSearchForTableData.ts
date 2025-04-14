// import { TABLE_SEARCH_END_POINTS } from "@/constants";
// import { TTableResponse } from "@/types/table";
// import axiosErrorHandler from "@/utils/axiosErrorHandler";
// import axiosInstance from "@/utils/axiosInstance";
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { TEmployeeFilterData } from "@/pages/admin/employees/list/EmployeesList.tsx";
//
// type TSearchProps = {
//   searchTerm: string;
//   searchFor: keyof typeof TABLE_SEARCH_END_POINTS;
//   queryParams?: TEmployeeFilterData;
// };
//
// const actSearchForTableData = createAsyncThunk(
//   "table/search",
//   async ({ searchTerm, searchFor, queryParams }: TSearchProps, thunkAPI) => {
//     const { rejectWithValue } = thunkAPI;
//
//     try {
//       if (searchFor === "employees") {
//         let url = TABLE_SEARCH_END_POINTS[searchFor];
//         if (queryParams) {
//           const params = new URLSearchParams();
//           for (const [key, value] of Object.entries(queryParams)) {
//             if (value !== undefined && value !== null) {
//               params.append(key, value.toString());
//             }
//           }
//           url += `?${params.toString()}`;
//         }
//         const response = await axiosInstance.get<TTableResponse>(url);
//         return { searchFor, results: response.data };
//       } else {
//         const url =
//           TABLE_SEARCH_END_POINTS[
//             searchFor as keyof typeof TABLE_SEARCH_END_POINTS
//           ] + searchTerm;
//
//         const response = await axiosInstance.get<TTableResponse>(url);
//         return { searchFor, results: response.data };
//       }
//     } catch (error) {
//       return rejectWithValue(axiosErrorHandler(error));
//     }
//   }
// );
//
// export default actSearchForTableData;
