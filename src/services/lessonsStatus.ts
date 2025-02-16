import axiosInstance from "@/utils/axiosInstance.ts";
import axiosErrorHandler from "@/utils/axiosErrorHandler.ts";
import {TOverview} from "@/components/tabs/sub-components/overview/Overview.tsx";
import { TLessonForCurrentHour, TLessonsForEachHour } from "@/store/tabs/TabsSlice.ts";

export const getLessonsStatusForEachHour = async ({studentId, day}: {studentId?: number, day?: string}): Promise<TLessonsForEachHour> => {
  try {
    let url = '/event/shared-lessons/lessons-by-hour/';
    if (studentId) {
      url = `/event/shared-lessons/lessons-by-hour/?student_id=${studentId}/`
    }
    if (day) {
      url = `/event/shared-lessons/lessons-by-hour/?day=${day}`
    }
    const response = await axiosInstance.get<TLessonsForEachHour>(url);
    return response.data;
  } catch (error) {
    return axiosErrorHandler(error)
  }
}


export const getLessonsStatusOverview = async (): Promise<TOverview> => {
  try {
    const response = await axiosInstance.get<TOverview>('/event/shared-lessons/overview/');
    return response.data;
  } catch (error) {
    return axiosErrorHandler(error)
  }
}

export const getLessonsStatusForCurrentHour = async (studentId?: number): Promise<TLessonForCurrentHour> => {
  try {
    let url = "/event/shared-lessons/current-lesson/"
    if (studentId) {
      url = `/event/shared-lessons/current-lesson/?student_id=${studentId}/`
    }
    const response = await axiosInstance.get<TLessonForCurrentHour>(url);
    return response.data;
  } catch (error) {
    return axiosErrorHandler(error)
  }
}
