import axiosInstance from "@/utils/axiosInstance.ts";
import axiosErrorHandler from "@/utils/axiosErrorHandler.ts";

type Teacher = {
  id: number;
  first_name: string;
  last_name: string;
};

type Location = {
  id: number;
  tw_id: number | null;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  spaces: number | null;
  calendar_color: string;
  is_sublocation: boolean;
  link: string;
  link_enabled: boolean;
  created_at: string;
  updated_at: string;
  sub_location: any | null;
};

type Curriculum = {
  id: number;
  name: string;
  status: string;
};

type Student = {
  id: number;
  initial_teachers: Teacher[];
  initial_location: Location | null;
  family_name: string;
  status: boolean;
  student_curriculum: Curriculum;
  services_str: string;
  teachers_str: string;
  subjects_str: string;
  tw_id: number | null;
  student_type: string;
  first_name: string;
  last_name: string;
  full_name: string | null;
  email: string;
  additional_email: string | null;
  home_phone: string;
  mobile_phone: string;
  birth_date: string;
  start_date: string;
  school: string;
  grade: string;
  additional_notes: string;
  calendar_color: string;
  default_location_id: number | null;
  subjects: any | null;
  time_zone: string;
  billing_method: string;
  student_cost: string;
  cost_premium_id: number | null;
  discount_rate: number | null;
  email_lesson_reminders: boolean;
  email_lesson_notes: boolean | null;
  sms_lesson_reminders: boolean;
  user_account: boolean;
  unviewed: any | null;
  welcome_sent_at: string | null;
  created_at: string;
  updated_at: string;
  customer: number;
  initial_services: number[];
  subject_choices: number[];
};

type SubscriptionCredit = {
  id: number;
  service_name: string;
  quantity: number;
  scheduled_lessons: number;
  unscheduled_lessons: number;
  unused_lessons: number;
  used_lessons: number;
};

export type TSpecificFamilyResponse = {
  id: number;
  students_attributes: Student[];
  first_name: string;
  last_name: string;
  full_name: string | null;
  email: string;
  mobile_phone: string;
  status: boolean;
  subscriptions_credits: SubscriptionCredit[];
  upcoming_lessons: any[];
  today_lessons: any[];
  tw_id: number | null;
  customer_type: string;
  salutation: string;
  additional_email: string;
  home_phone: string;
  work_phone: string;
  address: string;
  address_2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  additional_notes: string;
  time_zone: string;
  email_lesson_reminders: boolean;
  email_lesson_notes: boolean | null;
  sms_lesson_reminders: boolean;
  whatsapp_reminders: boolean;
  web_reminders: boolean;
  app_reminders: boolean;
  user_account: boolean;
  stripe_id: string | null;
  unviewed: any | null;
  is_family_contact: boolean | null;
  family_customer_id: number | null;
  payment_processor_id: number | null;
  last_invoice_date: string | null;
  created_at: string;
  updated_at: string;
  user: number;
};

export const getSpecificFamily = async (id: string): Promise<TSpecificFamilyResponse> => {
  try {
    const response = await axiosInstance.get<TSpecificFamilyResponse>(`/customer/family/${id}/`);
    return response.data;
  } catch (error) {
    return axiosErrorHandler(error)
  }
}