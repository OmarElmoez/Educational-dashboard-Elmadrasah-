import { TStatus } from "@/types/Dropdown";
import { TInvoiceResponse } from "@/types/table";
import axiosErrorHandler from "@/utils/axiosErrorHandler";
import axiosInstance from "@/utils/axiosInstance";
import createSearchParamsString from "@/utils/createSearchParamsString";

type TProps = {
  page: number | null;
  filters?: {
    startDate: string;
    endDate: string;
    status: TStatus;
  } | null;
};

export const getInvoices = async ({ filters, page }: TProps) => {
  let url = "customer/invoices/";

  try {
    if (filters) {
      const queryStr = createSearchParamsString(filters);
      url += `?${queryStr}&page=${page}`;
    } else {
      url += `?page=${page}`;
    }

    const response = await axiosInstance.get<TInvoiceResponse>(url);

    return response.data || response;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};
