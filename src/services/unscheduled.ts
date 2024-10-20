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

 {
            "id": 1,
            "name": "Omar ELmoez",
            "type": "individual",
            "subscription_date": "2024-10-20 09:04:36.548542+00:00",
            "service_name": "New test service 1.0",
            "grade": null,
            "purchased": 3,
            "scheduled_status": "unscheduled",
            "unscheduled": 3,
            "students": null
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
  searchTerm: any
): Promise<TUnscheduledResponse> => {
  const response = await axiosInstance.get<TUnscheduledResponse>(
    "/event/unscheduled-students/?type=individual",
    {
      params: {
        page: page,
        searchTerm: searchTerm,
      },
    }
  );

  return response.data;

  // Dummy data for testing
  // const dummyData: TUnscheduledResponse = {
  //   count: 25,
  //   next: "https://api.example.com/unscheduled?page=2",
  //   previous: null,
  //   results: Array.from({ length: 25 }, (_, index) => ({
  //     id: index + 1,
  //     customer_first_name: `customer ${index + 1}`,
  //     customer_last_name: `customer ${index + 1}`,
  //     service_name: `services ${index + 1}`,
  //     classValue:
  //       index % 4 === 0
  //         ? "low"
  //         : index % 4 === 1
  //         ? "medium"
  //         : index % 4 === 2
  //         ? "high"
  //         : "urgent",
  //     status:
  //       index % 3 === 0
  //         ? "pending"
  //         : index % 3 === 1
  //         ? "in_progress"
  //         : "completed",
  //     date: new Date(2023, 11, 31).toISOString(),
  //   })),
  // };

  // // Simulating API call delay
  // await new Promise((resolve) => setTimeout(resolve, 50));

  // return dummyData;
};

export const getUnscheduledFamilyList = async (
  page: number,
  searchTerm: any
): Promise<TUnscheduledResponse> => {
  const response = await axiosInstance.get<TUnscheduledResponse>("/event/unscheduled-students/?type=individual",
    {
      params: {
        page: page,
        searchTerm: searchTerm,
      },
    }
  );

  return response.data;

 
};