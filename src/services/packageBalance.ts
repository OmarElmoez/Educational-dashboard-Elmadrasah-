import axiosInstance from "@/utils/axiosInstance";
import { TBalanceResponse } from "@/types/table";
import { FilterFormData } from "@/pages/admin/lists/balance/FilterForm";



/**
 * https://elmadrasah-development-ff14bf466889.herokuapp.com/
 * customer/balance/?start_date=2024-09-26&
 * end_date=2024-09-27&is_active=true&name=tareq Abdulhameed&
 * email=tareq@gmail.com&phone=+201123659874&
 * remaining_credit=9.5&package_status=used,unused
 */

export const getPackageBalanceList = async (
  page: number,
  searchTerm: FilterFormData | null
): Promise<TBalanceResponse> => {
  console.log("searchTerm", searchTerm);

  const response = await axiosInstance.get<TBalanceResponse>("/customer/balance/", {
    params: {
      page,
      ...searchTerm,
    },
  });

  return response.data;
};
