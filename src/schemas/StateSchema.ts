import { z } from "zod";

const StateSchema = z.object({
  name: z.string(),
  state_code: z.string(),
});

export type TState = z.infer<typeof StateSchema>;