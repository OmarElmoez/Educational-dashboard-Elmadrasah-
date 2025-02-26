import axiosErrorHandler from "@/utils/axiosErrorHandler.ts";
import axiosInstance from "@/utils/axiosInstance.ts";
import { TAddStudentFormDataForServer } from "@/schemas/AddStudentSchema.ts";

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

export const getSpecificStudent = async ({id}: {id: string}): Promise<TAddStudentFormDataForServer> => {
  try {
    const response = await axiosInstance.get<TAddStudentFormDataForServer>(`/customer/individual/${id}`);
    return response.data;
  } catch (error) {
    return axiosErrorHandler(error);
  }
}

export const getAllRelatedStudents = async (): Promise<TRelatedStudent[]> => {
  try {
    const response = await axiosInstance.get<TRelatedStudent[]>("/event/shared-lessons/shared-students/");
    return response.data;
  } catch (error) {
    return axiosErrorHandler(error);
  }
}

export const getAllRelatedTeachers = async (student_id?: number): Promise<TRelatedTeacher[]> => {
  try {
    let url = "/event/shared-lessons/shared-teachers/";
    if (student_id) {
      url = `/event/shared-lessons/shared-teachers/?student_id=${student_id}/`
    }
    const response = await axiosInstance.get<TRelatedTeacher[]>(url);
    return response.data;
  } catch (error) {
    return axiosErrorHandler(error);
  }
}



