export type TUnscheduled = {
  id: number;
  name: string;
  type: string;
  subscription_date: string;
  service_name: string;
  scheduled_status: string;
  grade: string;
  purchased: number;
  unscheduled: number;
  students:null;
};

export type TUnscheduledFamily = {
  id: number;
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
