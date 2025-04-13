import axiosInstance from "@/utils/axiosInstance";
import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { TCustomer } from "@/types/table";

type TProps = {
  page: number,
};

type TResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: TCustomer[];
};

export const getStudents = async ({ page }: TProps) => {
  try {
    let url = "/customer/students/";

    if (page) {
      url += `?page=${page}`
    }

    const response = await axiosInstance.get<TResponse>(url);
    return response.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};
