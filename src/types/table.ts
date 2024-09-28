type TCustomer = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  mobile_phone: string;
  home_phone: string;
  student_type?: string;
  customer?: number;
  customer_type?: string;
  name?: string;
};

type TTableResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: TCustomer[];
};

export type { TCustomer, TTableResponse };