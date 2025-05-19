import axiosErrorHandler from "@/utils/axiosErrorHandler";
import axiosInstance from "@/utils/axiosInstance";
import { TAllTeachersReportData } from "@/types/table";

export const getTeachersReports = async ({ page }: { page: number }) => {
  try {
    let url = "/event/teacher/report/";
    if (page) {
      url += `?page=${page}`;
    }
    const response = await axiosInstance.get<TAllTeachersReportData>(url);
    return response.data || response;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

type TSpecificTeacherReport = {
  id: number,
  name: string,
  status: string,
  from_datetime: string,
  from_time: string,
  time_zone: string,
  teacher_name: string,
  student_name: string,
}

type TSpecificTeacherReportResponse = {
  results: TSpecificTeacherReport[];
};

export const getSpecificTeacherReport = async ({id}: {id: string | undefined}) => {
  try {
    const response = await axiosInstance.get<TSpecificTeacherReportResponse>(`/event/today_lessons/${id}`);
    return response.data;
  } catch (e) {
    throw axiosErrorHandler(e);
  }
}
