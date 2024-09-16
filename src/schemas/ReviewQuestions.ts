import { z } from "zod";

const ChoiceSchema = z.object({
  id: z.number(),
  choice_ar: z.string(),
  choice_en: z.string(),
  created_at: z.string(),
})

export type TChoice = z.infer<typeof ChoiceSchema>;

const QuestionSchema = z.object({
  id: z.number(),
  question_ar: z.string(),
  question_en: z.string(),
  type: z.string(),
  question_for: z.string(),
  created_at: z.string(),
  choice: z.array(ChoiceSchema),
});

export type TQuestion = z.infer<typeof QuestionSchema>;

const reviewQestionsSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(QuestionSchema),
});

export type TReviewQuestionsResponse = z.infer<typeof reviewQestionsSchema>