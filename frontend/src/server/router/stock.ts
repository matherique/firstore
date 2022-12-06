import { Prisma, Product, Stock } from "@prisma/client";
import { getAllQuerySchema, getByIdSchema } from "@shared/validations";
import { createSchema } from "@shared/validations/stock";
import { createRouter } from "./context";

export const stockRouter = createRouter().query("getAll", {
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

    const stocks = await prisma?.stock.groupBy({
      by: ["productId"],
      _sum: {
        quantity: true
      },
      where: {
        productId: {
          in: products.map(product => product.id)
        }
      }
    })

    if (!stocks) {
      return []
    }

    let productsStock = products.map(product => {
      const stock = stocks.find(stock => stock.productId === product.id)

      if (!stock) {
        return {
          ...product,
          quantity: 0
        }
      }

      return {
        ...product,
        quantity: stock?._sum?.quantity || 0
      }
    })

    return productsStock
  }
}).query("get", {
  input: getByIdSchema,
  async resolve({ input }) {
    const stock = await prisma?.stock.findMany({
      where: {
        productId: {
          in: input.id
        }
      }
    })

    if (!stock) {
      return []
    }

    return stock
  }
}).mutation("create", {
  input: createSchema,
  async resolve({ input }) {
    const stock = await prisma?.stock.create({
      data: {
        productId: input.productId,
        quantity: input.quantity
      }
    })

    if (!stock) throw new Error("could not create stock")

    return stock
  }
})