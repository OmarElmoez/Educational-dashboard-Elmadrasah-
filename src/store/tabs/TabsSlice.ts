import { createSlice } from "@reduxjs/toolkit";
import { TLoading } from "@/types/shared.ts";
import actGetAllHoursData from "@/store/tabs/act/actGetAllHoursData.ts";
import { isString } from "@/types/gurads.ts";
import { TStudent, TTeacher } from "@/components/tabs/sub-components/Shared.tsx";
import { TLesson } from "@/schemas/LessonSchema.ts";
import actGetCurrentHourData from "@/store/tabs/act/actGetCurrentHourData.ts";

export type TimeSlotInfo = {
  lesson_count: number;
  not_attended_student: number;
  not_attended_teacher: number;
  late_student_count: number;
  late_teacher_count: number;
  attendance_percentage: number;
  attendance: number;
  scheduled_students:number;
  cancelled_teachers:number;
  lessons: THourLesson[];
};

type HourlyCounts = {
  [timeSlot: string]: TimeSlotInfo;
};
type TlessonFile = {
    id: number,
    lesson: number,
    file: string,
    title: string,
    uploaded_at: string,
    uploaded_by: string
}
export type THourLesson = {
  start_time_student: null | string;
  end_time_student: null | string;
  student_name: string;
  start_time_employee: null | string;
  end_time_employee: null | string;
  spaces: null | string;
  status: "Scheduled" | "Attended" | "Missed" | "Progressing" | "Cancelled";
  employee_name: string;
  from_time: string;
  to_time: string;
  from_date: string;
  name: string;
  from_datetime: string;
  to_datetime: string;
  id: number;
  lesson_files: TlessonFile[];
  country: string;
};

// Define the main type
export type TLessonsForEachHour = {
  total_lessons_today: number;
  hourly_counts: HourlyCounts;
};

export type TLessonForCurrentHour = {
  lesson_count: number;
  attended_count: number;
  not_attended_count: number;
  attended_count_participant: number;
  not_attended_count_participant: number;
  attendance_percentage: number;
  teachers: TTeacher[];
  students: TStudent[];
  results: TLesson[]
}

type TTabsState = {
  allHoursData: TLessonsForEachHour,
  currentHourData: TLessonForCurrentHour,
  loading: TLoading,
  error: string | null,
}

const initialState: TTabsState = {
  loading: "idle",
  error: null,
  allHoursData: {
    total_lessons_today: 0,
    hourly_counts: {}
  },
  currentHourData: {
    lesson_count: 0,
    attended_count: 0,
    not_attended_count: 0,
    attendance_percentage: 0,
    attended_count_participant: 0,
    not_attended_count_participant: 0,
    teachers: [],
    students: [],
    results: []
  }
}

const TabsSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    clearAllHoursData: (state) => {
      state.allHoursData = {
        total_lessons_today: 0,
        hourly_counts: {}
      };
    }
  },
  extraReducers: (builder) => {

    // ============== Data For All Hours ==============
    builder
      .addCase(actGetAllHoursData.pending, (state) => {
        state.loading = 'pending';
        state.error = null
      })

      .addCase(actGetAllHoursData.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.allHoursData.hourly_counts = action.payload.hourly_counts;
        state.allHoursData.total_lessons_today = action.payload.total_lessons_today;
      })

      .addCase(actGetAllHoursData.rejected, (state, action) => {
        state.loading = 'failed';
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      })

    // ============== Data For Current Hour ==============
    builder
      .addCase(actGetCurrentHourData.pending, (state) => {
        state.loading = 'pending';
        state.error = null
      })

      .addCase(actGetCurrentHourData.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.currentHourData = action.payload;
    })

    .addCase(actGetCurrentHourData.rejected, (state, action) => {
      state.loading = 'failed';
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    })
  }
})

export {actGetAllHoursData, actGetCurrentHourData}

export const {clearAllHoursData} = TabsSlice.actions;

export default TabsSlice.reducer;