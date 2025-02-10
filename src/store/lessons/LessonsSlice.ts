import { createSlice } from "@reduxjs/toolkit";

import { TLesson } from "@/schemas/LessonSchema";
import { TLoading } from "@/types/shared";
import { isString } from "@/types/gurads";
import actGetLessonsByMonth from "./act/actGetLessonsByMonth.ts";
import actJoinLesson from "./act/actJoinLesson";
import actGetLessonsByDay from "@/store/lessons/act/actGetLessonsByDay.ts";
// Today_lessons is just used for Admin.
// Month_lessons is used for the rest users.
type TLessonsState = {
  Today_lessons: TLesson[];
  Month_lessons: TLesson[];
  attendance_link: string;
  end_attendance_link: string;
  count?: number;
  next?: string | null;
  previous?: string | null;
  loading: TLoading;
  error: string | null;

  // Student-specific fields
  subjects?: Record<
    string,
    { missed: number; attended: number; scheduled: number }
  >;
  completion_percentage?: number;

  // Family-specific fields
  students?: Array<{
    student_id: number;
    student_name: string;
    subjects: Record<
      string,
      { missed: number; attended: number; scheduled: number }
    >;
    completion_percentage: number;
  }>;

  // Admin-specific fields
  missed_stats?: {
    missed_participants: number;
    missed_teachers: number;
  };
  scheduled_stats?: {
    scheduled_participants: number;
    scheduled_teachers: number;
  };
  progressing_lessons?: number;
  ended_lessons?: number;
};

const initialState: TLessonsState = {
  Month_lessons: [],
  Today_lessons: [],
  attendance_link: "",
  end_attendance_link: "",
  count: 0,
  next: null,
  previous: null,
  loading: "idle",
  error: null,
  subjects: {},
  completion_percentage: 0,
  students: [],
  missed_stats: { missed_participants: 0, missed_teachers: 0 },
  scheduled_stats: { scheduled_participants: 0, scheduled_teachers: 0 },
  progressing_lessons: 0,
  ended_lessons: 0,
};

const lessonsSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {
    resetMonthLessons: (state) => {
      state.Month_lessons = [];
    }
  },
  extraReducers: (builder) => {

    // Lessons By Month
    builder.addCase(actGetLessonsByMonth.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });

    builder.addCase(actGetLessonsByMonth.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.Month_lessons = action.payload;
    });

    builder.addCase(actGetLessonsByMonth.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });

    // Lessons By Day
    builder.addCase(actGetLessonsByDay.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });

    builder.addCase(actGetLessonsByDay.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.Today_lessons = action.payload;
    });

    builder.addCase(actGetLessonsByDay.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });


    // join lessons
    builder.addCase(actJoinLesson.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });

    builder.addCase(actJoinLesson.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    })
  },
});

export const { resetMonthLessons } = lessonsSlice.actions;

export default lessonsSlice.reducer;
