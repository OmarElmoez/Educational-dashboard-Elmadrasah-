import { createSlice } from "@reduxjs/toolkit";

import { TLesson } from "@/schemas/LessonSchema";
import { TLoading } from "@/types/shared";
import actGetLessons from "./act/actGetLessons";
import { isString } from "@/types/gurads";
import actGetLessonsByRange from "./act/actGetLessonsByRange";
import actGetLessonsByDay from "./act/actGetLessonsByDay";
import actGetLessonsByStatus from "./act/actGetLessonsByStatus";
import actJoinLesson from "./act/actJoinLesson";
type TLessonsState = {
  calendar_lessons: TLesson[];
  today_lessons: TLesson[];
  all_lessons: TLesson[];
  status_lessons: TLesson[];
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
  calendar_lessons: [],
  all_lessons: [],
  today_lessons: [],
  status_lessons: [],
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actGetLessons.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });

    builder.addCase(actGetLessons.fulfilled, (state, action) => {
      state.loading = "succeeded";
      // if (action.meta.arg.from_date) {
      //   console.log('from get today', action.payload);
      //   state.today_lessons = action.payload.results;
      // } else {
      state.all_lessons = action.payload.results;
      // }
      state.next = action.payload.next;
      state.previous = action.payload.previous;
      if ("students" in action.payload) {
        state.students = action.payload.students as Array<{
          student_id: number;
          student_name: string;
          subjects: Record<
            string,
            { missed: number; attended: number; scheduled: number }
          >;
          completion_percentage: number;
        }>;
      }
    });

    builder.addCase(actGetLessons.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });

    // Lessons By Range
    builder.addCase(actGetLessonsByRange.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });

    builder.addCase(actGetLessonsByRange.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.calendar_lessons = action.payload;
    });

    builder.addCase(actGetLessonsByRange.rejected, (state, action) => {
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
      state.today_lessons = action.payload;
    });

    builder.addCase(actGetLessonsByDay.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });

    // Lessons By Status
    builder.addCase(actGetLessonsByStatus.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });

    builder.addCase(actGetLessonsByStatus.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.status_lessons = action.payload.results;
      state.next = action.payload.next;
      state.previous = action.payload.previous;
    });

    builder.addCase(actGetLessonsByStatus.rejected, (state, action) => {
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

export default lessonsSlice.reducer;
