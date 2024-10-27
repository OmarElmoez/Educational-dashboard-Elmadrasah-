export type TUnscheduled = {
  id: number;
  customer_id: number;
  name: string;
  type: string;
  subscription_date: string;
  service_name: string;
  scheduled_status: string;
  grade: string;
  purchased: number;
  unscheduled: number;
  students: null;
};

export type TUnscheduledFamily = {
  id: number;
  customer_id: number;
  name: string;
  type: string;
  subscription_date: string;
  service_name: string;
  scheduled_status: string;
  grade: string;
  purchased: number;
  unscheduled: number;
  students: TUnscheduled[] | null;
};

export type TdraftLessonsStatusResponse = {
  id: number;
  name: string;
  phone: string;
  image: string | null;
  subject: string;
  status: "Accepted" | "Rejected";
  send_datetime: string;
  accept_datetime: string;
  lessons_count: number;
};
