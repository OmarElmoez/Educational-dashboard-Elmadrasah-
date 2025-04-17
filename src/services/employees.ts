import axiosErrorHandler from "@/utils/axiosErrorHandler";
import axiosInstance from "@/utils/axiosInstance";
import { TAllEmployeesData } from "@/types/table";
import { TEmployeeFilterData } from "@/pages/admin/employees/list/EmployeesList";
import createSearchParamsString from "@/utils/createSearchParamsString";
import { TAddEmployeeFormData } from "@/schemas/AddEmployeeSchema";

export const getEmployees = async ({
                                     page,
                                     filters,
                                   }: {
  page: number;
  filters?: TEmployeeFilterData | null;
}) => {

  try {
    let url = "/employee/modify/";

    if (filters) {
      const queryStr = createSearchParamsString(filters)
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

type TSpecificEmployeeResponse = TAddEmployeeFormData;

export const getSpecificEmployee = async (employeeID: number): Promise<TSpecificEmployeeResponse> => {
  try {
    const response = await axiosInstance.get<TSpecificEmployeeResponse>(`/employee/modify/${employeeID}`);
    return response.data;
  } catch (error) {
    return axiosErrorHandler(error)
  }
}
