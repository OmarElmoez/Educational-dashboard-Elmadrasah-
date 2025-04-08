import {z} from "zod";

const SubjectSchema = z.object({
  student_credit: z.string().min(1, "برجاء تحديد عدد الحصص"),
  subject: z.string().min(1, "برجاء تحديد المادة"),
  gender: z.string().min(1, "برجاء تحديد النوع").nullable(),
  language: z.string().min(1, "برجاء تحديد اللغة").nullable(),
})

const PostScheduleLessonSchema =
  z.object({
    student_id: z.string().min(1, "يجب اختيار طالب"),
    lesson_credit: z.string(),
    timezone: z.string().min(1, 'برجاء تحديد التوقيت الزمني'),
    location_id: z.string().optional(),
    subjects: z.array(SubjectSchema),
    service_id: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    from_date: z.string().date().nullable(),
    to_date: z.string().date().optional(), // when submitting the form assign it to the same value as from_date
    from_time: z.string().nullable().optional(),
    to_time: z.string().nullable().optional(),
    time_id: z.string().optional(),
    is_auto: z.string(),
    employee_id: z.string().optional(), // this is the id you get from useParams.
    repeat: z.boolean().optional(),
    day_period: z.string().optional(),
    follow_up_type: z.string().nullable().optional(),
    received_days: z.array(z.string()).optional(),
    days: (z.string()).nullable().optional(),
    repeat_every: z.enum(['daily', 'weekly', 'monthly', '']).nullable().optional(),
    repeat_count: z.string().nullable().optional(),
    repeat_monthly: z.enum(['day', 'quarter', '']).nullable().optional(),
    repeat_times: z.string().nullable().optional(),
    end_repeat: z.enum(['never', 'after', 'on']).nullable().optional(),
    end_repeat_on: z.string().date().nullable().optional(),
    repeat_monthly_date: z.string().date().nullable().optional(),
    on_quarter: z.enum(['first', 'second', 'third', 'fourth', '']).nullable().optional(),
    teacher_ids: z.array(z.number()).optional(),
    lesson_draft_id: z.number().nullable().optional(),
    package_id: z.number().optional(),
  })
  .transform((data) => ({
    ...data,
    start_date: data.from_date,
    to_date: data.from_date
  }))
  .refine(data => {
    if (!data.from_date) return false;

    const selectedDate = new Date(data.from_date);
    const today = new Date();

    // Reset time components to compare dates only
    const selectedDateOnly = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
    const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    // Compare dates without time
    return selectedDateOnly >= todayDateOnly;
  }, {message: 'لا يمكن الجدولة بتاريخ فائت', path: ["from_date"]}
    )

export type TScheduleLessonFormData = z.infer<typeof PostScheduleLessonSchema>;

export default PostScheduleLessonSchema

type TKeysToOmit =
  "student_id"
  | "student_credit"
  | "lesson_credit"
  | "location_id"
  | "subjects"
  | "service_id"
  | "time_id"
  | "employee_id"
  | "follow_up_type"
  | "is_auto"
  | "repeat_count"
  | "repeat_times"


export type TScheduleLessonFormDataForServer = Omit<TScheduleLessonFormData, TKeysToOmit> & {
  student_id: number;
  lesson_credit: number;
  location_id: number | null;
  subjects: [{
    student_credit: number;
    subject: number;
    language: string | null,
    gender: string | null,
  }]
  service_id: number;
  time_id: number;
  employee_id: number | null;
  follow_up_type: number;
  is_auto: boolean;
  repeat_count: number | null;
  repeat_times: number;
  error?: string;
  conflicts?: string[];
}