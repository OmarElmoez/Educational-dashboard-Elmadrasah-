import {z} from "zod";

const SubjectSchema = z.object({
  student_credit: z.string().min(1, "برجاء تحديد عدد الحصص"),
  subject: z.string().min(1, "برجاء تحديد المادة"),
  gender: z.string().min(1, "برجاء تحديد النوع"),
  language: z.string().min(1, "برجاء تحديد اللغة"),
})

const PostScheduleLessonSchema =
  z.object({
    student_id: z.string().min(1, "يجب اختيار طالب"),
    lesson_credit: z.string(),
    timezone: z.string().min(1, 'برجاء تحديد التوقيت الزمني'),
    location_id: z.string().optional(),
    subjects: z.array(SubjectSchema),
    service_id: z.string(),
    description: z.string().optional(),
    from_date: z.string().date(),
    to_date: z.string().date().optional(), // when submitting the form assign it to the same value as from_date
    from_time: z.string().time().optional(),
    to_time: z.string().time().optional(),
    time_id: z.string().optional(),
    is_auto: z.string(),
    employee_id: z.string().optional(), // this is the id you get from useParams.
    repeat: z.boolean().optional(),
    day_period: z.string().optional(),
    follow_up_type: z.string().optional(),
    day: z.array(z.string()).optional(),
    days: z.array(z.string()).optional(),
    repeat_every: z.enum(['daily', 'weekly', 'monthly', '']).optional(),
    repeat_count: z.string().optional(),
    repeat_monthly: z.enum(['day', 'quarter', '']).optional(),
    repeat_times: z.string().optional(),
    end_repeat: z.enum(['never', 'after', 'on']).nullable().optional(),
    end_repeat_on: z.string().date().nullable().optional(),
    repeat_monthly_date: z.string().date().nullable().optional(),
    on_quarter: z.enum(['first', 'second', 'third', 'fourth', '']).optional(),
  })
  .transform((data) => ({
    ...data,
    start_date: data.from_date,
    to_date: data.from_date
  }));

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
  | "days"
  | "repeat_count"
  | "repeat_times"


export type TScheduleLessonFormDataForServer = Omit<TScheduleLessonFormData, TKeysToOmit> & {
  student_id: number;
  lesson_credit: number;
  location_id: number;
  subjects: [{
    student_credit: number;
    subject: number;
    language: string,
    gender: string,
  }]
  service_id: number;
  time_id: number;
  employee_id: number;
  follow_up_type: number;
  is_auto: boolean;
  days?: string,
  repeat_count: number;
  repeat_times: number;
}