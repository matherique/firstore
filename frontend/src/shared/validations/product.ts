import { z } from "zod";

export const createSchema = z.object({
  name: z.string(),
  price: z.number()
})

export type CreateSchema = z.infer<typeof createSchema>