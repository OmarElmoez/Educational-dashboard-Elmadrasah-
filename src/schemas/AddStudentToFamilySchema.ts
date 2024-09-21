import { EmployeeTitleForSchema, StudentStatusForSchema } from "@/constants";

import { matchIsValidTel } from "mui-tel-input";
import { z } from "zod";

export type TAddStudentToFamilyFormDataForServer = TAddStudentToFamilyFormData;

export const AddStudentToFamilySchema = z.object({
  // ********
  // customer: z.string().min(1, "برجاء ادخال الاسم الأول"),

  status: z.enum(StudentStatusForSchema as [string, ...string[]], {
    errorMap: () => ({ message: "برجاء اختيار الحالة نشط" }),
  }),

  first_name: z.string().min(1, "برجاء ادخال الاسم الأول"),
  last_name: z.string().min(1, "برجاء ادخال الاسم الأخير"),
  // full_name: z.string().min(1, "برجاء ادخال الاسم الكامل"),
  email: z
    .string()
    .min(1, "برجاء ادخال البريد الإلكتروني")
    .email("برجاء ادخال بريد إلكتروني صحيح"),

  mobile_phone: z.string().refine((phoneNumber) => {
    return matchIsValidTel(phoneNumber);
  }, "رقم الهاتف غير صالح"),

  home_phone: z.string().optional(),
  time_zone: z.string().min(1, "برجاء اختيار التوقيت الزمني"),
  birth_date: z.string().nullable().optional(),
  start_date: z.string(),
  school: z.string().nullable().optional(),
  grade: z.string().nullable().optional(),
  student_curriculum: z.array(z.string()),
  subject_choices: z.array(z.string()),
  additional_notes: z.string().optional(),
  initial_services: z.array(z.string()).optional(),
  initial_location: z.string().optional(),
  initial_teachers: z.array(z.string()).optional(),
  calendar_color: z.string().optional(),
  billing_method: z.enum(["Use Student Profile Price"], {
    errorMap: () => ({ message: "برجاء اختيار طريقة الدفع" }),
  }),
  student_cost: z.string().optional(),

  sms_lesson_reminders: z.boolean(),
  email_lesson_reminders: z.boolean(),
  whatsapp_reminders: z.boolean(),
  app_reminders: z.boolean(),
  web_reminders: z.boolean(),
  send_welcome_email: z.boolean(),
  user_account: z.boolean(),
});

export type TAddStudentToFamilyFormData = z.infer<
  typeof AddStudentToFamilySchema
>;

/*
{
    "customer": 17, // required id of the family customer

    // ******* add onsubmit
    "student_type": "child",  // required

    "first_name": "Ahmed",  // required
    "last_name": "Ali",  // required
    "email": "AhmedAli120@teachworks.com",  // required
    "additional_email": "ahmedali12@gmail.com",
    "home_phone": "0553876478",
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
}
*/
