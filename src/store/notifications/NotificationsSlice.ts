import { TLoading } from "@/types/shared";
import { TNotification } from "@/schemas/NotificationsSchema";
import { createSlice } from "@reduxjs/toolkit";
import actGetNotifications from "./act/actGetNotifications";
import { isString } from "@/types/gurads";

type TNotificationsState = {
  records: TNotification[];
  next: string;
  previous: string;
  loading: TLoading;
  error: string | null;
}


const initialState: TNotificationsState = {
  records: [],
  next: '',
  previous: '',
  loading: "idle",
  error: null,
}

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actGetNotifications.pending, (state) => {
      state.loading = "pending"
      state.error = null
    })

    builder.addCase(actGetNotifications.fulfilled, (state, action) => {
      state.loading = "succeeded"
      state.records = action.payload.results
      state.next = action.payload.next
      state.previous = action.payload.previous
    })

    builder.addCase(actGetNotifications.rejected, (state, action) => {
      state.loading = "failed"
      if (isString(action.payload)) {
        state.error = action.payload
      }
    })
  },
})

export default notificationsSlice.reducer