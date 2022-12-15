import { Product } from "@models"

export type ProductWithQuantity = Product & { quantity: number }

export type ProductsWithQuantity = ProductWithQuantity[]