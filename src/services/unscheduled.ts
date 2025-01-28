import { FilterFormData } from "@/pages/admin/lists/Unscheduled/FilterForm";
import { TdraftLessonsStatusResponse, TUnscheduled } from "@/types/ListsTypes";
import axiosInstance from "@/utils/axiosInstance";

type TUnscheduledResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: TUnscheduled[];
};

/**


  {
        "id": 3,
        "name": "Moaz tareq",
        "phone": "",
        "image": null,
        "subject": "اللغة الألمانية",
        "status": "Accepted",
        "send_datetime": "2024-10-26T11:42:13.870513Z",
        "accept_datetime": "2024-10-26T11:49:11.464063Z",
        "lessons_count": 1
    }

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
    "/event/unscheduled-students/?type=individual/",
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
  const response = await axiosInstance.get<TUnscheduledResponse>("/event/unscheduled-students/?type=family/",
    {
      params: {
        page: page,
        ...searchTerm,
      },
    }
  );

  return response.data;

 
};







export const getscheduledWinnersTeachersList = async (std_id: string, id: string): Promise<TdraftLessonsStatusResponse[]> => {
  // const response = await axiosInstance.get<TdraftLessonsStatusResponse[]>(`event/draft-lessons/scheduled/?customer_id=86&package_id=5`);
  const response = await axiosInstance.get<TdraftLessonsStatusResponse[]>(`/event/draft-lessons/scheduled/?customer_id=${std_id}&package_id=${id}`);

  return response.data;
};

export const getscheduledParticipantsTeachersList = async (std_id: string, id: string): Promise<TdraftLessonsStatusResponse[]> => {
  // const response = await axiosInstance.get<TdraftLessonsStatusResponse[]>(`/event/draft-lessons/participants/?`);
  const response = await axiosInstance.get<TdraftLessonsStatusResponse[]>(`/event/draft-lessons/participants/?customer_id=${std_id}&package_id=${id}`);

  return response.data;
};

export const getscheduledErrorsList = async (std_id: string, id: string): Promise<TdraftLessonsStatusResponse[]> => {
  // const response = await axiosInstance.get<TdraftLessonsStatusResponse[]>(`/event/draft-lessons/scheduling_error/?customer_id=13&package_id=27`);
  const response = await axiosInstance.get<TdraftLessonsStatusResponse[]>(`/event/draft-lessons/scheduling_error/?customer_id=${std_id}&package_id=${id}`);

  return response.data;
};