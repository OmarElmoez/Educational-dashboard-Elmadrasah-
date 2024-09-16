import { z } from "zod";
import { LessonSchema } from "./LessonSchema";

const TeacherResponseSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(LessonSchema),
  statistics: z.object({
    total_lessons: z.number(),
    total_attended: z.number(),
    total_scheduled: z.number(),
    total_missed: z.number(),
  }),
});

export type TTeacherResponse = z.infer<typeof TeacherResponseSchema>;