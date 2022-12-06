import { Prisma, Product } from "@prisma/client";
import { getAllQuerySchema, getByIdSchema } from "@shared/validations";
import { createSchema, updateProductSchema } from "@shared/validations/product";
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
}).query("get", {
  input: getByIdSchema,
  async resolve({ input }) {
    const product = await prisma?.product.findUnique({ where: { id: input.id } })

    if (!product) throw new Error("could not find product")

    // get stock sum of product
    const stock = await prisma?.stock.groupBy({
      by: ["productId"],
      _sum: {
        quantity: true
      },
      where: {
        productId: {
          in: [product.id]
        }
      }
    })

    return { ...product, quantity: stock?.[0]?._sum?.quantity || 0 }
  }
}).mutation("update", {
  input: updateProductSchema,
  async resolve({ input }) {
    const product = await prisma?.product.update({
      where: { id: input.id },
      data: {
        name: input.name,
        price: input.price
      }
    })

    if (!product) throw new Error("could not update product")

    return product
  }
})