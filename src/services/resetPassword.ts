import axiosInstance from "@/utils/axiosInstance";
import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { TFormData } from "@/pages/login/otp/ConfirmEmail";
import { OtpFormData } from "@/pages/login/otp/OtpCode";
import {TFormValuesWithEmail} from "@/pages/login/SetPassword";

const ResetPasswordServices = {
  forgetPassword: async (data: TFormData) => {
    try {
      const response = await axiosInstance.post('/user/forget/', data);
      console.log('from sending otp: ', response);
      return response;
    } catch (error) {
      throw axiosErrorHandler(error);
    }
  },


  verifyOtp: async (data: OtpFormData) => {
    try {
      const response = await axiosInstance.post('/user/verify/', data);
      return response;
    } catch (error) {
      throw axiosErrorHandler(error);
    }
  },

  resetNewPassword: async (data: TFormValuesWithEmail) => {
    try {
      const response = await axiosInstance.post('/user/reset/', data);
      return response;
    } catch (error) {
      throw axiosErrorHandler(error);
    }
  },

  resendOtp: async (data: TFormData) => {
    try {
      const response = await axiosInstance.post('/user/resend/', data);
      return response;
    } catch (error) {
      throw axiosErrorHandler(error);
    }
  },
};

export default ResetPasswordServices;