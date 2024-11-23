import { z } from "zod";

const ReviewQuestionAnswerSchema = z.union([
  z.number(),
  z.array(z.number()).min(1, 'برجاء تقديم اختيار واحد علي الاقل'),
  z.string(),
]);

export const ReviewSchema = z.record(z.string(), ReviewQuestionAnswerSchema);

export type TReview = z.infer<typeof ReviewSchema>;


