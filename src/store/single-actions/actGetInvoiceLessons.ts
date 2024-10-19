// import axiosErrorHandler from "@/utils/axiosErrorHandler";
// import { createAsyncThunk } from "@reduxjs/toolkit";

// type TInvoiceProps = {
//   token: string | undefined;
// }

// const actGetInvoiceLessons = createAsyncThunk("invoice/getInvoiceLessons", async ({token}: TInvoiceProps, thunkAPI) => {
//   const { rejectWithValue } = thunkAPI;

//   try {
//     const url = "https://elmadrasah-development-ff14bf466889.herokuapp.com/customer/lesson_filter/";

//     const config = {
//       headers: {
//         Aurthorization: `Token ${token}`,
//       },
//       params: {
        
//       }
//     }

//   } catch (error) {
//     return rejectWithValue(axiosErrorHandler(error));
//   }

// });

// export default actGetInvoiceLessons;