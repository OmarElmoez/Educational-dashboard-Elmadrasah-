import {TRolesForServer} from "@/schemas/RolesSchema.ts";
import axiosInstance from "@/utils/axiosInstance.ts";
import axiosErrorHandler from "@/utils/axiosErrorHandler.ts";

type TPermissionResponse = {
  id: number;
  name: string;
  permissions: {
    "id": number;
    "name": string;
    "codename": string;
    "content_type": number
  }[];
}

export const createAPermissionGroup = async (data: TRolesForServer): Promise<TPermissionResponse | string> => {
  try {
    const response = await axiosInstance.post<TPermissionResponse>("/employee/group/", data);
    if (response.status === 201) {
      return response.data;
    } else {
      return "هذا الاسم موجود من قبل";
    }
  } catch (error) {
    return axiosErrorHandler(error)
  }
}