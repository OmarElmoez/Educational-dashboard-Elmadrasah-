import axiosErrorHandler from "@/utils/axiosErrorHandler";
import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
type TeacherLanguage = "en" | "ar";

type TeacherSubject = {
  id: number;
  name: string;
  created_at: string;
};

type Teacher = {
  id: number;
  first_name: string;
  last_name: string;
  subjects: TeacherSubject[];
  teacher_language: TeacherLanguage;
};

type Subject = {
  id: number;
  name: string;
  student_credit: number;
  created_at: string;
};

type Student = {
  id: number;
  first_name: string;
  last_name: string;
};

type Customer = {
  first_name: string;
  last_name: string;
  credit: number;
};

type Shift = {
  name: string;
  id: number;
  created_at: string;
};

export type TDay = {
  id: number;
  name: string;
}

type LeadflowData = {
  customer: Customer;
  students: Student[];
  days: TDay[];
  shift: Shift;
  time: any[];
  timezone: string;
  subjects: Subject[];
  teachers: Teacher[];
  created_at: string;
  form: number;
};

 export type TLessonDraftData = {
  package_id: number;
  service_id: number;
  description: string;
  name: string;
  from_date: null | string;
  from_time: null | string;
  to_date: null | string;
  to_time: null | string;
  time_zone: null | string;
  is_auto: boolean;
  repeat: boolean;
  repeat_every: 'daily' | 'weekly' | 'monthly' | null;
  repeat_count: null | number;
  repeat_monthly: 'day' | 'quarter' | null;
  repeat_monthly_date: string | null;
  on_quarter: "first" | "second" | "third" | "fourth" | null;
  end_repeat: 'never' | 'after' | 'on' | null;
  end_repeat_on: null | string;
  repeat_times: null | number;
  days: null | any[];
  lesson_draft_id: number | null,
  follow_up_type: number | string | null,
  teacher_language: string | null,
  gender: string | null
};

export type TRescheduleLessonResponse = {
  leadflow_data: LeadflowData[];
  lesson_draft_data: TLessonDraftData;
};

const actGetRescheduleLessonData = createAsyncThunk(
  "single-actions/actGetRescheduleLessonData",
  async ({ id }: { id: string }, thunkAPI) => {
    // async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await axiosInstance.get<TRescheduleLessonResponse>(
        "/event/draft-lessons/" + id
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetRescheduleLessonData;
