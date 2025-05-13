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
