import { z } from 'zod';

const lessonFileSchema = z.object({
  id: z.number(),
  lesson: z.number(),
  file: z.string().url(),
  title: z.string(),
  uploaded_at: z.string().datetime(),
  uploaded_by: z.string()
});

export type TLessonFile = z.infer<typeof lessonFileSchema>

export const LessonSchema = z.object({
  id: z.number(),
  location_name: z.string(),
  employee_name: z.string(),
  employee_bio: z.string(),
  employee_language: z.string().nullable(),
  employee_country: z.string().nullable(),
  subject: z.string().nullable(),
  subject_name: z.string().nullable(),
  employee_image: z.string().url().nullable(),
  employee_average_rating: z.number(),
  lesson_files: z.array(lessonFileSchema),
  attendance_link: z.string(),
  end_attendance_link: z.string(),
  service_name: z.string(),
  tw_id: z.number(),
  name: z.string(),
  description: z.string(),
  series_id: z.number().nullable(),
  parent_location_name: z.string().nullable(),
  parent_location_id: z.number().nullable(),
  spaces: z.number().nullable(),
  joinable: z.boolean().nullable(),
  from_date: z.string(),
  from_time: z.string(),
  to_date: z.string(),
  to_time: z.string(),
  time_zone: z.string(),
  from_datetime: z.string(),
  to_datetime: z.string(),
  duration_minutes: z.number(),
  status: z.union([
    z.literal('Scheduled'),
    z.literal('Attended'),
    z.literal('Missed'),
    z.literal('Progressing'),
    z.literal('Canceled'),
  ]),
  custom_status: z.string().nullable(),
  completed_at: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
  location_id: z.number(),
  employee_id: z.number(),
  service_id: z.number(),
  participants: z.record(z.number(), z.object({
    student_name: z.string(),
    start_time_student: z.string().nullable(),
    end_time_student: z.string().nullable(),
    grade: z.string(),
    objective: z.string(),
    remaining_classes_percentage: z.number().nullable(),
    student_language: z.string(),
    country: z.string(),
    image: z.string().url().nullable(),
    credit: z.number()
  }))
});

export type TLesson = z.infer<typeof LessonSchema>;