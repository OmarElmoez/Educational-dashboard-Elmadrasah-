import axiosErrorHandler from "@/utils/axiosErrorHandler.ts";
import axiosInstance from "@/utils/axiosInstance.ts";

export type TRelatedStudent = {
  id: number,
  name: string,
  lesson_count: number,
  completion_percentage: number
}

export type TRelatedTeacher = {
  id: number,
  name: string,
  image: string,
  subject: string,
  average_rating: number,
}

export const getAllRelatedStudents = async(): Promise<TRelatedStudent[]> => {
  try {
    const response = await axiosInstance.get<TRelatedStudent[]>("/event/shared-lessons/shared-students/");
    return response.data;
  } catch (error) {
    return axiosErrorHandler(error);
  }
}

export const getAllRelatedTeachers = async(): Promise<TRelatedTeacher[]> => {
  try {
    const response = await axiosInstance.get<TRelatedTeacher[]>("/event/shared-lessons/shared-teachers/");
    return response.data;
  } catch (error) {
    return axiosErrorHandler(error);
  }
}

