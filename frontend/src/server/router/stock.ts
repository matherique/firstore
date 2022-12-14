import { Stock } from "@models";
import { getAllQuerySchema, getByIdSchema } from "@shared/validations";
import { createSchema } from "@shared/validations/stock";
import { createRouter } from "./context";
import { ProductsWithQuantity } from "./types";

const STOCK_MIN_QUANTITY = 50

export const stockRouter = createRouter().query("getAll", {
  input: getAllQuerySchema,
  async resolve({ input: { query, quantity, page, maxQuantity } }) {

    const url = new URL(`${process.env.API_ENDPOINT}/stock`)
    url.searchParams.set("query", query!)
    url.searchParams.set("quantity", quantity.toString())
    url.searchParams.set("page", page.toString())

    if (maxQuantity) {
      url.searchParams.set("maxQuantity", STOCK_MIN_QUANTITY.toString())
    }

    const result = await fetch(url.toString(), {
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((err) => console.error(err))

    if (!result || result.status !== 200) throw new Error("could not get products stock")

    return await result.json() as ProductsWithQuantity
  }
}).query("get", {
  input: getByIdSchema,
  async resolve({ input }) {
    const result = await fetch(`${process.env.API_ENDPOINT}/stock/${input.id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((err) => console.error(err))

    if (!result || result.status !== 200) throw new Error("could not get stocks")

    return await result.json() as Stock[]
  }
}).mutation("create", {
  input: createSchema,
  async resolve({ input }) {
    const result = await fetch(`${process.env.API_ENDPOINT}/stock`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: input.productId,
        quantity: input.quantity,
      }),
    }).catch((err) => console.error(err))

    if (!result || result.status !== 200) throw new Error("could not create stock")

    return await result.json() as Stock
  }
})