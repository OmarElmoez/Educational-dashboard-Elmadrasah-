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

type LeadflowData = {
  customer: Customer;
  students: Student[];
  days: any[];
  shift: Shift;
  time: any[];
  timezone: string;
  subjects: Subject[];
  teachers: Teacher[];
  created_at: string;
  form: number;
};

type LessonDraftData = {
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
  repeat_every: null | number;
  repeat_count: null | number;
  end_repeat: null | string;
  end_repeat_on: null | string;
  end_repeat_after: null | number;
  days: null | any[];
};

type TRescheduleLessonResponse = {
  leadflow_data: LeadflowData[];
  lesson_draft_data: LessonDraftData;
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
      console.log("response.data", response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetRescheduleLessonData;
