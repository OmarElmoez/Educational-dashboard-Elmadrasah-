import { z } from 'zod';

export const LessonSchema = z.object({
  id: z.number(),
  location_name: z.string(),
  employee_name: z.string(),
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
  }))
});

export type TLesson = z.infer<typeof LessonSchema>;