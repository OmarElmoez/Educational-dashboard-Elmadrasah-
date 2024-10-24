import { z } from "zod";

const subjectSchema = z.object({
  id: z.number(),
  name: z.string(),
  created_at: z.string().datetime()
});

const teacherSchema = z.object({
  id: z.number(),
  first_name: z.string(),
  last_name: z.string(),
  subjects: z.array(subjectSchema),
  teacher_language: z.enum(["en", "ar"])
});

const daySchema = z.object({
  id: z.number(),
  name: z.string(),
  created_at: z.string().datetime()
});

const timeSchema = z.object({
  id: z.number(),
  name: z.string(),
  created_at: z.string().datetime()
});

const shiftSchema = z.object({
  id: z.number(),
  name: z.string(),
  created_at: z.string().datetime()
});

const studentSchema = z.object({
  id: z.number(),
  first_name: z.string(),
  last_name: z.string()
});

const customerSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  credit: z.number()
});

const leadflowDataSchema = z.object({
  customer: customerSchema,
  students: z.array(studentSchema),
  days: z.array(daySchema),
  shift: shiftSchema,
  time: z.array(timeSchema),
  timezone: z.string(),
  subjects: z.array(subjectSchema),
  teachers: z.array(teacherSchema),
  created_at: z.string().datetime(),
  form: z.number()
});

const responseSchema = z.object({
  leadflow_data: z.array(leadflowDataSchema)
});

export type TLeadFlowData = z.infer<typeof leadflowDataSchema>;

export type TScheduleLessonResponse = z.infer<typeof responseSchema>;
export default responseSchema;