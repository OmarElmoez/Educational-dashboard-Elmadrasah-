import { EmployeeTitleForSchema, StudentStatusForSchema } from "@/constants";

import { matchIsValidTel } from "mui-tel-input";
import { z } from "zod";

type TKeysToOmit = "default_subject" | "subject_choices";

export type TAddStudentFormDataForServer = Omit<
  TAddStudentFormData,
  TKeysToOmit
> & {
  students_attributes: {
    first_name?: string;
    last_name?: string;
    email?: string;
    mobile_phone?: string;

    birth_date?: string | null;
    start_date: string;
    school?: string | null;
    grade?: string | null;
    additional_notes?: string | null;
    calendar_color: string;
    status: string;
    billing_method: string;
    student_cost: string;
    initial_services?: number[];
    initial_teachers?: number[];
    initial_location?: number;
    subject_choices?: number[];
  };
};

export const AddStudentSchema = z.object({
  status: z.enum(StudentStatusForSchema as [string, ...string[]], {
    errorMap: () => ({ message: "برجاء اختيار الحالة نشط" }),
  }),
  salutation: z.enum(EmployeeTitleForSchema as [string, ...string[]], {
    errorMap: () => ({ message: "برجاء اختيار اللقب" }),
  }),

  first_name: z.string().min(1, "برجاء ادخال الاسم الأول"),
  last_name: z.string().min(1, "برجاء ادخال الاسم الأخير"),
  full_name: z.string().min(1, "برجاء ادخال الاسم الكامل"),
  email: z
    .string()
    .min(1, "برجاء ادخال البريد الإلكتروني")
    .email("برجاء ادخال بريد إلكتروني صحيح"),

  additional_email: z
    .string()
    .email("برجاء ادخال بريد إلكتروني صحيح")
    .optional(),

    mobile_phone: z.string().refine((phoneNumber) => {
    return matchIsValidTel(phoneNumber);
  }, "رقم الهاتف غير صالح"),

  home_phone: z.string().optional(),

  work_phone: z.string().optional(),

  address: z.string().optional(),
  address_2: z.string().optional(),

  country: z.string().min(1, "برجاء اختيار الدولة"),
  state: z.string().optional(),
  city: z.string().optional(),
  zip: z.string().optional(),
  time_zone: z.string().min(1, "برجاء اختيار التوقيت الزمني"),
  additional_notes: z.string().optional(),

  students_attributes: z.object({
    first_name: z.string().nullable().optional(),
    last_name: z.string().nullable().optional(),
    email: z.string().nullable().optional(),
    mobile_phone: z.string().nullable().optional(),

    birth_date: z.string().nullable().optional(),
    start_date: z.string(),
    school: z.string().nullable().optional(),
    grade: z.string().nullable().optional(),
    student_curriculum: z.array(z.string()),
    subject_choices: z.array(z.string()),
    initial_services: z.array(z.string()).optional(),
    initial_location: z.string().optional(),
    initial_teachers: z.array(z.string()).optional(),
    calendar_color: z.string().optional(),
    billing_method: z.enum(["Use Student Profile Price"], {
      errorMap: () => ({ message: "برجاء اختيار طريقة الدفع" }),
    }),
    student_cost: z.string().optional(),
  }),


  sms_lesson_reminders: z.boolean(),
  email_lesson_reminders: z.boolean(),
  whatsapp_reminders: z.boolean(),
  app_reminders: z.boolean(),
  web_reminders: z.boolean(),
  send_welcome_email: z.boolean(),
  user_account: z.boolean(),
});

export type TAddStudentFormData = z.infer<typeof AddStudentSchema>;

/*
   "customer_type": "individual",  // required field
    "salutation": "Miss",  // title
    "first_name": "Jesse",  // required field
    "last_name": "Eigen",  // required field
    "email": "jesse@teachworks.com",  // required field
    "additional_email": null,
    "home_phone": null,
    "mobile_phone": "+201068453392",  // required field
    "work_phone": null,
    "address": null,
    "address_2": null,
    "city": null,
    "state": null,
    "zip": null,
    "country": null,
    "additional_notes": "Needs help with SAT test preparation.",
    "status": "Active",  // required field
    "time_zone": "Cairo",  // required field
    "email_lesson_reminders": false,
    "email_lesson_notes": false,
    "sms_lesson_reminders": false,
    "whatsapp_reminders": false,
    "web_reminders": false,
    "app_reminders": false,
    "user_account": true, // default false
    "stripe_id": null,
    "unviewed": null,
    "is_family_contact": null,
    "family_customer_id": null,
    "payment_processor_id": null,
    "last_invoice_date": null,
    "created_at": null,
    "updated_at": null,
    "students_attributes": {
        "student_type": "individual",  // required
        "first_name": "Jesse",  // required
        "last_name": "Eigen",  // required
        "email": "jesse@teachworks.com",  // required
        "additional_email": null,
        "home_phone": null,
        "mobile_phone": "+201068453392",  // required
        "birth_date": null,
        "start_date": "2020-02-16",
        "school": null,
        "grade": null,
        "additional_notes": null,
        "calendar_color": "#3D04E1",
        "default_location_id": 1,
        "subjects": null,
        "status": "Active",
        "time_zone": "Cairo",
        "billing_method": "Student Cost",
        "student_cost": "25.50",
        "cost_premium_id": null,
        "discount_rate": null,
        "email_lesson_reminders": false,
        "email_lesson_notes": false,
        "sms_lesson_reminders": false,
        "user_account": true,
        "unviewed": null,
        "welcome_sent_at": null,
        "initial_services": [1, 2], // list of service ids optional field
        "initial_teachers": [2],  // List of related teacher IDs optional field
        "initial_location": 1, // default location id optional field
        "subject_choices": [1, 2] // List of subject ids optional field
        // billing method must be: '\''Use Service List Price'\'' , '\''Use Student Profile Price'\'', '\''Charge Flat Fee'\'', Package

    }
}'
*/
