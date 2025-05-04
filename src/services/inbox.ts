import axiosInstance from "@/utils/axiosInstance.ts";
import axiosErrorHandler from "@/utils/axiosErrorHandler.ts";

export type TReviewData = {
  id: number;
  reviewed_by: string;
  reviewer_name: string;
  reviewer_image: string | null;
  reviewed_name: string;
  lesson: number;
  average_rating: number;
  answer: string;
  subject_name: string;
  created_at: string;
};

export type TFileData = {
  id: number;
  lesson: number;
  file: string;
  title: string;
  is_exam: boolean;
  is_verified: boolean | null;
  uploaded_at: string;
  uploaded_by: string;
  teacher_name: string;
  student_name: string;
  student_image: string | null;
  teacher_image: string | null;
  subject_name: string;
};
export type TItem =
  | {
      type: "review";
      created_at: string;
      data: TReviewData;
    }
  | {
      type: "file";
      created_at: string;
      data: TFileData;
    };
type TInboxResponse = {
  count: number;
  next: string;
  previous: string;
  results: TItem[];
};

export const getInboxData = async (): Promise<TInboxResponse> => {
  try {
    const response = await axiosInstance.get<TInboxResponse>(`/event/inbox/`);
    return response.data;
  } catch (error) {
    return axiosErrorHandler(error);
  }
};
