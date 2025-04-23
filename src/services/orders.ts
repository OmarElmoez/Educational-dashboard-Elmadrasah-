import { TOrdersResponse } from "@/schemas/OrderSchema";
import axiosErrorHandler from "@/utils/axiosErrorHandler";
import axiosInstance from "@/utils/axiosInstance";
import createSearchParamsString from "@/utils/createSearchParamsString.ts";

type TProps = {
  page: number;
  filters?: {
    start_date: string;
    end_date: string;
  } | null;
};

export const getOrders = async ({ page, filters }: TProps) => {
  try {
    let url = "/app/orders";

    if (filters) {
      const queryStr = createSearchParamsString(filters);
      url += `?${queryStr}&page=${page}`;
    } else {
      url += `?page=${page}`;
    }

    const response = await axiosInstance.get<TOrdersResponse>(url);
    return response.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};
