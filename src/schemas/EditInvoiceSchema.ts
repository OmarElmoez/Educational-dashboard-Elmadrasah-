import { z } from "zod";

export const EditInvoiceSchema = z.object({
  customer: z.number().optional(),
  customer_name: z.string().optional(),
  invoice_type: z.enum(["invoice", "credit_note"]).default("invoice"),
  formatted_number: z.string().optional(),
  date: z.string().min(1, "برجاء ادخال تاريخ الفاتورة"),
  due_date: z.string().min(1, "برجاء ادخال تاريخ الاستحقاق"),
  reference: z.string().nullable().optional(),

  status: z.enum(["Saved", "Approved", "Paid", "Void"]).default("Saved"),
  start_date: z.string().nullable().optional(),
  end_date: z.string().nullable().optional(),

  payment_allocations: z.array(z.any()).optional(),

  tax_treatment: z
    .enum(["Tax Exclusive", "Tax Inclusive", "Tax Exempt"])
    .default("Tax Exclusive"),
  subtotal: z.string().optional(),
  sales_tax_total: z.string().nullable().optional(),
  tax_count: z.string().optional(),
  total: z.string().nullable().optional(),

  terms_text: z.string().nullable().optional(),

  send_email: z.boolean().optional(),
  add: z.string().optional(),

  charges: z
    .array(
      z.object({
        title: z.string().min(1, "برجاء ادخال اسم الخدمة"),
        description: z.string().min(1, "برجاء ادخال الوصف"),
        quantity: z.string().min(1, "برجاء ادخال الكمية"),
        unit_price: z.string().min(1, "برجاء ادخال سعر الوحدة"),
        discount_rate: z.string().optional(),
        amount: z.string().min(1, "برجاء ادخال المبلغ"),
      })
    )
    .optional(),

  packages: z
    .array(
      z.object({
        // student: z.string().min(1, "برجاء اختيار الطالب"),
        service: z.union([
          z.string().min(1, "برجاء اختيار الخدمة"),
          z.number().min(1, "برجاء اختيار الخدمة"),
        ]),
        description: z.string().min(1, "برجاء ادخال الوصف"),
        quantity: z.string().min(1, "برجاء ادخال الكمية"),
        unit_price: z.string().min(1, "برجاء ادخال سعر الوحدة"),
        discount_rate: z.string().optional(),
        amount: z.string().min(1, "برجاء ادخال المبلغ"),
        // transaction_type: z.enum(["subscription", "one_time"]).default("subscription"),
      })
    )
    .optional(),

  lessons: z
    .array(
      z.object({
        student: z.string().min(1, "برجاء اختيار الطالب"),
        employee: z.string().min(1, "برجاء اختيار الموظف").optional(),
        service: z.string().min(1, "برجاء اختيار الخدمة"),
        status: z
          .enum(["Scheduled", "Attended", "Missed", "Cancelled"])
          .default("Scheduled")
          .optional(),
        custom_status: z.string().nullable().optional(),
        description: z.string().min(1, "برجاء ادخال الوصف"),
        invoice_unit_price: z.string().min(1, "برجاء ادخال سعر الوحدة"),
        invoice_discount_rate: z.string().min(1, "برجاء ادخال نسبة الخصم"),
        invoice_amount: z.string().min(1, "برجاء ادخال المبلغ"),
      })
    )
    .optional(),

  filtration: z
    .array(
      z.object({
        start_date: z.string().nullable().optional(),
        end_date: z.string().nullable().optional(),
        report: z
          .enum(["All", "Scheduled", "Attended", "Missed"])
          .nullable()
          .optional(),
      })
    )
    .nullable()
    .optional(),
});

export type TEditInvoiceFormData = z.infer<typeof EditInvoiceSchema>;

type TKeysToOmit = "id";

export type TEditInvoiceFormDataForServer = Omit<
  TEditInvoiceFormData,
  TKeysToOmit
> & {
  id: number | null | string;
};

type TKeysToOmitGet = "id"
 
export type TEditInvoiceFormDataForGet = Omit<
  TEditInvoiceFormData,
  TKeysToOmitGet
> & {
  id: number | null | string;
};