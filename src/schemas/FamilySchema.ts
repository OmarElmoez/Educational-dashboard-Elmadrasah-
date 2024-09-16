import { z } from "zod";
import { SubjectStatsSchema } from "./StudentSchema";
import { LessonSchema } from "./LessonSchema";

const StudentSubjectsSchema = z.record(z.string(), SubjectStatsSchema);

const StudentInfoSchema = z.object({
  student_name: z.string(),
  student_id: z.number(),
  subjects: StudentSubjectsSchema,
  completion_percentage: z.number(),
});

// "statistics": [
//   {
//       "id": 6,
//       "first_name": "Moaz",
//       "last_name": "Tareq",
//       "email": "moaztareq9@msa.edu.eg",
//       "completion_percentage": 10.0,
//       "service_name": "New test service",
//       "total_attended": 1,
//       "total_scheduled": 18,
//       "total_progressing": 0,
//       "total_missed": 1,
//       "total_canceled": 0,
//       "subjects": [
//           {
//               "name": "Biology",
//               "teacher_name": "Amr alaa",
//               "Attended": 1,
//               "Scheduled": 18,
//               "Progressing": 0,
//               "Missed": 1,
//               "Canceled": 0
//           }
//       ]

const FamilyResponseSchema = z.object({
  count: z.number(),
  students: z.array(StudentInfoSchema),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(LessonSchema),
  // statistics: z.array(StudentInfoSchema),
});

export type TFamilyResponse = z.infer<typeof FamilyResponseSchema>;