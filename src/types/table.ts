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


type TPayment = {
  id: number;
  unallocated_amount: number;
  customer_name: string;
  created_at: string;
  updated_at: string;
  tw_id: string | number | null;
  type: string;
  amount: string;
  date: string;
  payment_method: string;
  description: string;
  customer: number;
};

type TPaymentResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: TPayment[];
};


type TInvoice = {
  id: number;
  amount_due: number;
  // charges: {
  //   title: string;
  //   description: string;
  //   quantity: number;
  //   unit_price: number;
  //   discount_rate: number;
  //   amount: number;
  // }[];
  // packages: {
  //   description: string;
  //   quantity: number;
  //   unit_price: number;
  //   discount_rate: number;
  //   amount: number;
  //   transaction_type: string;
  //   timestamps: {
  //     created_at: string;
  //     updated_at: string;
  //   };
  // }[];
  // lessons: {
  //   status: string;
  //   custom_status: string;
  //   description: string;
  //   invoice_unit_price: number;
  //   invoice_discount_rate: number;
  //   invoice_amount: number;
  //   timestamps: {
  //     created_at: string;
  //     updated_at: string;
  //   };
  // }[];
  customer_name: string;
  tw_id: string | null;
  invoice_type: string;
  formatted_number: string;
  date: string;
  due_date: string;
  reference: string;
  tax_treatment: string;
  status: string;
  start_date: string;
  end_date: string;
  terms_text: string;
  subtotal: string;
  sales_tax_total: string;
  total: string;
  hide_flags: boolean;
  invoice_token: string | null;
  sent_at: string | null;
  reminder_sent_at: string | null;
  created_at: string;
  updated_at: string;
  customer: number;
};

type TInvoiceResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: TInvoice[];
};
export type { TCustomer, TTableResponse, TInvoice, TInvoiceResponse, TPayment, TPaymentResponse };
