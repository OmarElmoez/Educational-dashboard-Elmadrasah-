import { z } from "zod";

export const CreateInvoiceSchema = z.object({
  customer: z.string().min(1, "برجاء اختيار العميل"),
  invoice_type: z.enum(["invoice", "credit_note"]).default("invoice"),
  formatted_number: z.string().min(1, "برجاء ادخال الرقم المنسق للفاتورة"),
  date: z.string().min(1, "برجاء ادخال تاريخ الفاتورة"),
  due_date: z.string().min(1, "برجاء ادخال تاريخ الاستحقاق"),
  reference: z.string().nullable().optional(),
  
  status: z.enum(["Saved", "Approved", "Paid", "Void"]).default("Saved"),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  
  tax_treatment: z.enum(["Tax Exclusive", "Tax Inclusive", "Tax Exempt"]).default("Tax Exclusive"),
  subtotal: z.string().min(1, "برجاء ادخال الإجمالي الفرعي"),
  sales_tax_total: z.string().min(1, "برجاء ادخال إجمالي ضريبة المبيعات"),
  tax_count: z.string().nullable(),
  total: z.string().nullable(),

  terms_text: z.string().nullable().optional(),

  send_email: z.boolean().optional(),
  add: z.string().optional(),

  charges: z.array(
    z.object({
      title: z.string().min(1, "برجاء ادخال اسم الخدمة"),
      description: z.string().min(1, "برجاء ادخال الوصف"),
      quantity: z.string().min(1, "برجاء ادخال الكمية"),
      unit_price: z.string().min(1, "برجاء ادخال سعر الوحدة"),
      discount_rate: z.string().min(1, "برجاء ادخال نسبة الخصم"),
      amount: z.string().min(1, "برجاء ادخال المبلغ"),
    })
  ).optional(),

  packages: z.array(
    z.object({
      // student: z.string().min(1, "برجاء اختيار الطالب"),
      service: z.string().min(1, "برجاء اختيار الخدمة"),
      description: z.string().min(1, "برجاء ادخال الوصف"),
      quantity: z.string().min(1, "برجاء ادخال الكمية"),
      unit_price: z.string().min(1, "برجاء ادخال سعر الوحدة"),
      discount_rate: z.string().min(1, "برجاء ادخال نسبة الخصم"),
      amount: z.string().min(1, "برجاء ادخال المبلغ"),
      // transaction_type: z.enum(["subscription", "one_time"]).default("subscription"),
    })
  ).optional(),

  // lessons: z.array(
  //   z.object({
  //     student: z.string().min(1, "برجاء اختيار الطالب"),
  //     employee: z.string().min(1, "برجاء اختيار الموظف"),
  //     service: z.string().min(1, "برجاء اختيار الخدمة"),
  //     status: z.enum(["Scheduled", "Attended", "Missed", "Cancelled"]).default("Scheduled"),
  //     custom_status: z.string().nullable().optional(),
  //     description: z.string().min(1, "برجاء ادخال الوصف"),
  //     invoice_unit_price: z.string().min(1, "برجاء ادخال سعر الوحدة"),
  //     invoice_discount_rate: z.string().min(1, "برجاء ادخال نسبة الخصم"),
  //     invoice_amount: z.string().min(1, "برجاء ادخال المبلغ"),
  //   })
  // ).optional(),

  filtration: z.array(
    z.object({
      start_date: z.string().nullable().optional(),
      end_date: z.string().nullable().optional(),
      report: z.enum(["All", "Scheduled", "Attended", "Missed"]).nullable().optional(),

    })
  ).nullable().optional(),

});

export type TCreateInvoiceFormData = z.infer<typeof CreateInvoiceSchema>;

// type TKeysToOmit =
//   | "default_subject"
//   | "subject_choices"
//   | "is_active"
//   | "initial_students";

// export type TCreateInvoiceSchemaFormDataForServer = Omit<
// TCreateInvoiceFormData,
//   TKeysToOmit
// > & {
//   default_subject: number | null;
//   subject_choices: Array<number>;
//   initial_students: number[];
//   is_active: boolean;
// };


/*

{
    "customer": 1,
    "invoice_type": "invoice",
    "formatted_string": "INV-0003",
    "date": "2024-09-17",
    "due_date": "2024-09-30",
    "reference": "",
    "tax_treatment": "Tax Exclusive",
    "status": "Saved",  // Saved, Approved, Paid, Void
    "start_date": "2024-09-01", // must be set when you create invoice lesson
    "end_date": "2024-09-30", // must be set when you create invoice lesson
    "terms_text": null, // instructions
    "subtotal": "351.0",
    "sales_tax_total": "0.0",
    "total": "351.0",
    "charges": [
        {
            "title": "Math service 1",
            "description": "Math service 1",
            "quantity": "13.0",
            "unit_price": "30.0",
            "discount_rate": "10.0",
            "amount": "351.0"
        }
    ],
    "packages": [
        {
            "student": 1, // student id
            "service": 3, // service id
            "description": "Package 1",
            "quantity": "2.0",
            "unit_price": "160.0",
            "discount_rate": "0.0",
            "amount": "320.0",
            "transaction_type": "subscription"
        }
    ],
    "lessons": [
        {
            "student": 1, // student id
            "employee": 2, // employee id
            "service": 3, // service id
            "status": "Scheduled",
            "custom_status": null,
            "description": "Math lesson scheduled",
            "invoice_unit_price": "160.0",
            "invoice_discount_rate": "0.0",
            "invoice_amount": "160.0"
        },
        {
            "student": 1, // student id
            "employee": 2, // employee id
            "service": 3, // service id
            "status": "Attended",
            "custom_status": null,
            "description": "Math lesson attended",
            "invoice_unit_price": "160.0",
            "invoice_discount_rate": "0.0",
            "invoice_amount": "160.0"
        }
    ]
    // invoice could be charges or packages or lessons 
}

TAX_TREATMENT_CHOICES = (
    ('Tax Exclusive', 'Tax Exclusive'),
    ('Tax Inclusive', 'Tax Inclusive'),
    ('Tax Exempt', 'Tax Exempt'),
)


STATUS_CHOICES = (
    ('Saved', 'Saved'),
    ('Approved', 'Approved'),
    ('Paid', 'Paid'),
    ('Void', 'Void'),
)
*/