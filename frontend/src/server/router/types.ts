import { Product } from "@prisma/client";

export type ProductWithQuantity = Product & { quantity: number }

export type ProductsWithQuantity = ProductWithQuantity[]