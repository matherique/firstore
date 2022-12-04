import { Prisma, Product, Stock } from "@prisma/client";
import { getAllQuerySchema } from "@shared/validations";
import { createRouter } from "./context";

export const stockRouter = createRouter().query("getAll", {
  input: getAllQuerySchema,
  async resolve({ input: { query, quantity, page } }) {
    // let stocks: Stock[] | undefined = []

    const stocks = await prisma?.stock.findMany({
      include: {
        Product: true
      }
    })

    // let common: Prisma.SelectSubset<Prisma.ProductFindManyArgs, Prisma.ProductFindManyArgs> = {
    //   take: quantity,
    //   skip: quantity * (page - 1),
    //   orderBy: {
    //     name: "asc",
    //   },
    // }

    // if (query) {
    //   stocks = await prisma?.product.findMany({
    //     where: {
    //       name: {
    //         contains: query
    //       }
    //     },
    //     ...common
    //   })
    // } else {
    //   stocks = await prisma?.product.findMany({
    //     ...common
    //   })
    // }

    if (!stocks) throw new Error("could not find products")

    return stocks
  }
})