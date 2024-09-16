import { z } from "zod";
import { LessonSchema } from "./LessonSchema";

export const SubjectStatsSchema = z.object({
  missed: z.number(),
  attended: z.number(),
  scheduled: z.number(),
});

const StudentResponseSchema = z.object({
  count: z.number(),
  subjects: z.record(z.string(), SubjectStatsSchema),
  completion_percentage: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(LessonSchema),
});

export type TStudentResponse = z.infer<typeof StudentResponseSchema>;