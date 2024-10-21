import { TLoading } from "@/types/shared";
import { TUser, TUserStatistics } from "@/types/User";
import { createSlice } from "@reduxjs/toolkit";
import actGetUserProfile from "./act/actGetUserProfile";
import { isString } from "@/types/gurads";
import actUpdateUserProfile from "./act/actUpdateUserProfile";
type TProfileState = {
  loading: TLoading,
  statistics: TUserStatistics,
  error: string | null,
  user: TUser | null,
  img_url: string
}

const initialState: TProfileState = {
  user: null,
  statistics: {
    total_lessons: 0,
    total_attended: 0,
    total_scheduled: 0,
    total_missed: 0
  },
  loading: "idle",
  error: null,
  img_url: ""
}

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    removeProfile: (state) => {
      state.user = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(actGetUserProfile.pending, (state) => {
      state.loading = "pending"
      state.error = null
    }),

    builder.addCase(actGetUserProfile.fulfilled, (state, action) => {
      state.loading = "succeeded"
      state.user = action.payload.user
      state.statistics = action.payload.statistics
      state.img_url = action.payload.user.image

    }),

    builder.addCase(actGetUserProfile.rejected, (state, action) => {
      state.loading = "failed"
      if (isString(action.payload)) {
        state.error = action.payload
      }
    })

    // update Profile
    builder.addCase(actUpdateUserProfile.pending, (state) => {
      state.loading = "pending"
      state.error = null
    }),

    builder.addCase(actUpdateUserProfile.fulfilled, (state) => {
      state.loading = "succeeded"
    }),

    builder.addCase(actUpdateUserProfile.rejected, (state, action) => {
      state.loading = "failed"
      if (isString(action.payload)) {
        state.error = action.payload
      }
    })
  },
})

export const { removeProfile } = profileSlice.actions

export { actGetUserProfile, actUpdateUserProfile }

export default profileSlice.reducer