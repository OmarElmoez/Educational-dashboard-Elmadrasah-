import { FilterFormData } from "@/pages/admin/lists/Unscheduled/FilterForm";
import { TUnscheduled } from "@/types/ListsTypes";
import axiosInstance from "@/utils/axiosInstance";

type TUnscheduledResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: TUnscheduled[];
};

/**
 *  id: number;
  customer_first_name: string;
  customer_last_name: string;
  date: string;
  service_name: string;
  status: string;
  classValue: string;


 /event/unscheduled-students/?type=individual
  &name=Omar ELmoez&purchased=3&scheduled_status=unscheduled&subscription_date=2024-10-20
 * 
 */
/**
 * Fetches a list of unscheduled items from the server.
 *
 * @param page - The page number to fetch.
 * @param searchTerm - An optional search term to filter the results.
 * @returns A promise that resolves to the response data, which includes the count, next and previous page URLs, and the list of unscheduled items.
 */

export const getUnscheduledList = async (
  page: number,
  searchTerm: FilterFormData | null
): Promise<TUnscheduledResponse> => {
  const response = await axiosInstance.get<TUnscheduledResponse>(
    "/event/unscheduled-students/?type=individual",
    {
      params: {
        page: page,
        ...searchTerm,
      },
    }
  );

  return response.data;
};

export const getUnscheduledFamilyList = async (
  page: number,
  searchTerm: FilterFormData | null
): Promise<TUnscheduledResponse> => {
  const response = await axiosInstance.get<TUnscheduledResponse>("/event/unscheduled-students/?type=family",
    {
      params: {
        page: page,
        ...searchTerm,
      },
    }
  );

  return response.data;

 
};