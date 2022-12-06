import { z } from "zod";

export const getAllQuerySchema = z.object({
  query: z.string().optional(),
  page: z.number(),
  quantity: z.number().min(1).max(100),
})

export const deleteByIdSchema = z.object({
  id: z.string(),
})

export const getByIdSchema = z.object({
  id: z.string(),
})