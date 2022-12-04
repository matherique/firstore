import { Prisma, Product } from "@prisma/client";
import { getAllQuerySchema } from "@shared/validations";
import { createSchema } from "@shared/validations/product";
import { deleteByIdSchema } from "@shared/validations";
import { createRouter } from "./context";

export const productRouter = createRouter().query("getAll", {
  input: getAllQuerySchema,
  async resolve({ input: { query, quantity, page } }) {
    let products: Product[] | undefined = []

    let common: Prisma.SelectSubset<Prisma.ProductFindManyArgs, Prisma.ProductFindManyArgs> = {
      take: quantity,
      skip: quantity * (page - 1),
      orderBy: {
        name: "asc",
      },
    }

    if (query) {
      products = await prisma?.product.findMany({
        where: {
          name: {
            contains: query
          }
        },
        ...common
      })
    } else {
      products = await prisma?.product.findMany({
        ...common
      })
    }

    if (!products) throw new Error("could not find products")

    return products
  }
}).mutation("create", {
  input: createSchema,
  async resolve({ input: { name, price } }) {
    const product = await prisma?.product.create({
      data: {
        name,
        price
      }
    })

    if (!product) throw new Error("could not create product")

    return product
  }
}).mutation("delete", {
  input: deleteByIdSchema,
  async resolve({ input }) {
    await prisma?.product.delete({ where: { id: input.id } })
  }
})