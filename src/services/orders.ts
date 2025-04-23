import { TOrdersResponse } from "@/schemas/OrderSchema";
import axiosErrorHandler from "@/utils/axiosErrorHandler";
import axiosInstance from "@/utils/axiosInstance";

type TProps = {
  page: number;
};

export const getOrders = async ({ page }: TProps) => {
  try {
    let url = "/app/orders";

    if (page) {
      url += `?page=${page}`;
    }
    const response = await axiosInstance.get<TOrdersResponse>(url);
    return response.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};
