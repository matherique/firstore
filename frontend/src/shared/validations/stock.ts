import { z } from "zod";

export const createSchema = z.object({
  productId: z.string(),
  quantity: z.number(),
})

export type CreateSchema = z.infer<typeof createSchema>