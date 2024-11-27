import axiosInstance from "@/utils/axiosInstance.ts";
import {TLessonsForEachHour} from "@/components/tabs/sub-components/all-hours/AllHours.tsx";
import axiosErrorHandler from "@/utils/axiosErrorHandler.ts";
import {TOverview} from "@/components/tabs/sub-components/overview/Overview.tsx";

export const getLessonsStatusForEachHour = async (): Promise<TLessonsForEachHour> => {
  try {
    const response = await axiosInstance.get<TLessonsForEachHour>('/event/shared-lessons/lessons-by-hour/');
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