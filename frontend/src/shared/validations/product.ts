import { z } from "zod";

export const createSchema = z.object({
  name: z.string(),
  price: z.number()
})

export type CreateSchema = z.infer<typeof createSchema>

export const updateProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
})

export type UpdateProductSchema = z.infer<typeof updateProductSchema>