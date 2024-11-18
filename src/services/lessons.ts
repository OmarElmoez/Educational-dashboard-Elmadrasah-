import {TLesson, TLessonFile} from "@/schemas/LessonSchema.ts";
import axiosInstance from "@/utils/axiosInstance.ts";
import axiosErrorHandler from "@/utils/axiosErrorHandler.ts";
import {TTrackFromServer} from "@/components/tabs/sub-components/summary/Summary.tsx";
import {TTrack} from "@/schemas/AddTrackSchema.ts";

const actGetSpecificLessonData = async (classId: string): Promise<TLesson> => {
  try {
    const response = await axiosInstance.get<TLesson>(`/dashboard/lesson/${classId}`);

    return response.data;
  } catch (error) {
    return axiosErrorHandler(error)
  }
}

type TLessonFilesResponse = {
  count: number;
  next: string;
  previous: string;
  results: TLessonFile[];
}

const actGetLessonFiles = async (classId: string): Promise<TLessonFile[]> => {
  try {
    const response = await axiosInstance.get<TLessonFilesResponse>(`/event/lessons/${classId}/files/`);
    return response.data.results;
  } catch (error) {
    return axiosErrorHandler(error)
  }
}

const actDeleteLessonFile = async (classId: string, fileId: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/event/lessons/${classId}/files/${fileId}`);
  } catch (error) {
    return axiosErrorHandler(error)
  }
}

const actEditLessonFileName = async (classId: string, fileId: number, title: string): Promise<TLessonFile> => {
  const formData = new FormData();
  formData.append("title", title);
  try {
    const response = await axiosInstance.patch(`/event/lessons/${classId}/files/${fileId}/`, formData);
    return response.data;
  } catch (error) {
    return axiosErrorHandler(error);
  }
}

// ============================= Lesson Tracks =============================
type TLessonTracksResponse = TTrackFromServer[]

const actGetLessonTracks = async (classId: string): Promise<TLessonTracksResponse> => {
  try {
    const response = await axiosInstance.get<TLessonTracksResponse>(`/dashboard/lesson/${classId}/tracks/`);
    return response.data
  } catch (error) {
    return axiosErrorHandler(error)
  }
}

const actAddNewTrack = async (classId: string, data: TTrack): Promise<TTrackFromServer> => {
  try {
    const response = await axiosInstance.post(`/dashboard/lesson/${classId}/tracks/`, data)
    return response.data;
  } catch (error) {
    return axiosErrorHandler(error)
  }
}

const actGetSharedLessons = async (classId: string): Promise<TLesson[]> => {
  try {
    const response = await axiosInstance.get(`/dashboard/lesson/${classId}/shared/`);
    return response.data;
  } catch (error) {
    return axiosErrorHandler(error)
  }
}

export {
  actGetSpecificLessonData,
  actGetLessonFiles,
  actDeleteLessonFile,
  actEditLessonFileName,
  actGetLessonTracks,
  actAddNewTrack,
  actGetSharedLessons
};