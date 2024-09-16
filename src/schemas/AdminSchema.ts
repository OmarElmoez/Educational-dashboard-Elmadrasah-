import { z } from "zod";
import { LessonSchema } from "./LessonSchema";

const StatsSchema = z.object({
  missed_participants: z.number(),
  missed_teachers: z.number(),
});

const ScheduledStatsSchema = z.object({
  scheduled_participants: z.number(),
  scheduled_teachers: z.number(),
});

const AdminResponseSchema = z.object({
  count: z.number(),
  missed_stats: StatsSchema,
  scheduled_stats: ScheduledStatsSchema,
  progressing_lessons: z.number(),
  ended_lessons: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(LessonSchema),
});

export type TAdminResponse = z.infer<typeof AdminResponseSchema>;