import { Product } from "@prisma/client";
import { getAllQuerySchema, getByIdSchema } from "@shared/validations";
import { createSchema, updateProductSchema } from "@shared/validations/product";
import { deleteByIdSchema } from "@shared/validations";
import { createRouter } from "./context";
import { ProductWithQuantity } from "./types";

export const productRouter = createRouter().query("getAll", {
  input: getAllQuerySchema,
  async resolve(req) {
    const { input: { query, quantity, page } } = req

    const url = new URL("http://localhost:1355/product")
    url.searchParams.set("query", query!)
    url.searchParams.set("quantity", quantity.toString())
    url.searchParams.set("page", page.toString())

    const result = await fetch(url.toString(), {
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((err) => console.error(err))

    if (!result) throw new Error("could not get products")

    return await result.json() as Product[]
  }
}).mutation("create", {
  input: createSchema,
  async resolve({ input: { name, price } }) {
    const result = await fetch(`http://localhost:1355/product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        price: price,
      }),
    }).catch((err) => console.error(err))

    if (!result) throw new Error("could not create product")

    return await result.json() as Product
  }
}).mutation("delete", {
  input: deleteByIdSchema,
  async resolve({ input }) {
    const result = await fetch(`http://localhost:1355/product/${input.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((err) => console.error(err))

    if (!result || result.status !== 200) throw new Error("could not delete product")

    return
  }
}).query("get", {
  input: getByIdSchema,
  async resolve({ input }) {
    const result = await fetch(`http://localhost:1355/product/${input.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((err) => console.error(err))

    if (!result) throw new Error("could not delete product")

    return await result.json() as ProductWithQuantity
  }
}).mutation("update", {
  input: updateProductSchema,
  async resolve({ input }) {
    const result = await fetch(`http://localhost:1355/product/${input.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: input.name,
        price: input.price,
      }),
    }).catch((err) => console.error(err))

    if (!result) throw new Error("could not update product")

    return await result.json() as Product
  }
})