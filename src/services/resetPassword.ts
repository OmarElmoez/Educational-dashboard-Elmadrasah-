import axiosInstance from "@/utils/axiosInstance";
import axiosErrorHandler from "@/utils/axiosErrorHandler";

type EmailPayload = {
  email: string;
};

type VerifyOtpPayload = EmailPayload & {
  otp: string;
};

type ResetPasswordPayload = VerifyOtpPayload & {
  password: string;
};

const ResetPasswordServices = {
  forgetPassword: async (data: EmailPayload) => {
    try {
      const response = await axiosInstance.post('/user/forget/', data);
      return response.data;
    } catch (error) {
      throw axiosErrorHandler(error);
    }
  },

  verifyOtp: async (data: VerifyOtpPayload) => {
    try {
      const response = await axiosInstance.post('/user/verify/', data);
      return response.data;
    } catch (error) {
      throw axiosErrorHandler(error);
    }
  },

  Services: async (data: ResetPasswordPayload) => {
    try {
      const response = await axiosInstance.post('/user/reset/', data);
      return response.data;
    } catch (error) {
      throw axiosErrorHandler(error);
    }
  },

  resendOtp: async (data: EmailPayload) => {
    try {
      const response = await axiosInstance.post('/user/resend/', data);
      return response.data;
    } catch (error) {
      throw axiosErrorHandler(error);
    }
  },
};

export default ResetPasswordServices;