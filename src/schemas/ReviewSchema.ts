import { z } from "zod";

const ReviewQuestionAnswerSchema = z.union([
  z.number(),
  z.array(z.number()).min(1, 'Please select atleast one option'),
  z.string(),
]);

export const ReviewSchema = z.record(z.string(), ReviewQuestionAnswerSchema);

export type TReview = z.infer<typeof ReviewSchema>;


