import { z } from "zod";

const CitySchema = z.object({
  adminName1: z.string(),
  name: z.string(),
})

export type TCity = z.infer<typeof CitySchema>