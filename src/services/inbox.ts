import axiosInstance from "@/utils/axiosInstance.ts";
import axiosErrorHandler from "@/utils/axiosErrorHandler.ts";

export type TInboxReview = {
  id: number;
  reviewed_by: string;
  reviewer_name: string;
  reviewer_image: string;
  reviewed_name: string;
  lesson: number;
  average_rating: number;
  answer: string;
  created_at: string;
}

type TReviewResponse = {
  count: number;
  next: string;
  previous: string;
  results: TInboxReview[];
}

export const getReviews = async (): Promise<TReviewResponse> => {
  try {
    const response = await axiosInstance.get<TReviewResponse>(`/dashboard/review_admin/`);
    return response.data;
  } catch (error) {
    return axiosErrorHandler(error)
  }
}

