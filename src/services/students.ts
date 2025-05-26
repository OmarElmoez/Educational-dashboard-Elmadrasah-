import axiosInstance from "@/utils/axiosInstance";
import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { TCustomer } from "@/types/table";
import createSearchParamsString from "@/utils/createSearchParamsString.ts";
import { TStudentFilterData } from "@/pages/admin/students/list/studentsList.tsx";

type TProps = {
  page: number,
  filters?: TStudentFilterData | null;
};

type TResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: TCustomer[];
};

export const getStudents = async ({ page, filters }: TProps) => {
  try {
    let url = "/customer/students/";

    if (filters) {
      const queryStr = createSearchParamsString(filters);
      url += `?${queryStr}&page=${page}`;
    } else {
      url += `?page=${page}`;
    }

    const response = await axiosInstance.get<TResponse>(url);
    return response.data || response;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};
