import axiosErrorHandler from "@/utils/axiosErrorHandler";
import axiosInstance from "@/utils/axiosInstance";
import { TAllEmployeesData } from "@/types/table";
import { TEmployeeFilterData } from "@/pages/admin/employees/list/EmployeesList";
import createSearchParamsString from "@/utils/createSearchParamsString";

export const getEmployees = async ({
                                     page,
                                     searchTerms,
                                   }: {
  page: number;
  searchTerms?: TEmployeeFilterData | null;
}) => {
  try {
    let url = "/employee/modify/";

    if (searchTerms) {
      const queryStr = createSearchParamsString(searchTerms)
      url += `?${queryStr}&page=${page}`;
    } else {
      url += `?page=${page}`;
    }

    const response = await axiosInstance.get<TAllEmployeesData>(url);
    return response.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};
