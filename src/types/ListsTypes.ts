// ********* this is not the real names to the endpoint update it
export type TUnscheduled = {
  id: number;
  customer_first_name: string;
  customer_last_name: string;
  date: string;
  service_name: string;
  status: string;
  classValue: string;
};

// ********* this is not the real names to the endpoint update it
export type TUnscheduledFamily = {
  id: number;
  customer_first_name: string;
  customer_last_name: string;
  date: string;
  service_name: string;
  status: string;
  classValue: string;
  children?: TUnscheduled[];
};
