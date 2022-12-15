import {
  loginSchema,
  searchSchema,
  signupSchema,
  createSchema,
  updateSchema,
} from "@shared/validations/user";
import { Product, User } from "@prisma/client";
import { createRouter } from "./context";
import { z } from "zod";
import { deleteByIdSchema, getAllQuerySchema } from "@shared/validations";

export const userRouter = createRouter()
  .query("getAll", {
    input: getAllQuerySchema,
    async resolve({ input: { query, quantity, page } }) {

      const url = new URL(`${process.env.API_ENDPOINT}/user`)
      url.searchParams.set("query", query!)
      url.searchParams.set("quantity", quantity.toString())
      url.searchParams.set("page", page.toString())

      const result = await fetch(url.toString(), {
        headers: {
          "Content-Type": "application/json",
        },
      }).catch((err) => console.error(err))

      if (!result) throw new Error("could not update user")

      return await result.json() as User[]

    },
  }).mutation("create", {
    input: createSchema,
    async resolve({ input }) {
      const result = await fetch(`${process.env.API_ENDPOINT}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: input.name,
          email: input.email,
          password: input.password,
          profile: input.profile,
        }),
      }).catch((err) => console.error(err))

      if (!result) throw new Error("could not create user")

      return await result.json() as User
    },
  }).mutation("delete", {
    input: deleteByIdSchema,
    async resolve({ input }) {
      const result = await fetch(`${process.env.API_ENDPOINT}/user/${input.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).catch((err) => console.error(err))

      if (!result) throw new Error("could not delete user")

      return await result.json()
    }
  }).query("get", {
    input: z.string(),
    async resolve({ input: id }) {
      const result = await fetch(`${process.env.API_ENDPOINT}/user/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).catch((err) => console.error(err))

      if (!result) throw new Error("could not delete user")

      return await result.json() as User
    }
  }).mutation("update", {
    input: updateSchema,
    async resolve({ input }) {
      const result = await fetch(`${process.env.API_ENDPOINT}/user/${input.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: input.name,
          email: input.email,
          password: input.password,
          profile: input.profile,
        }),
      }).catch((err) => console.error(err))

      if (!result) throw new Error("could not update user")

      return await result.json() as User
    }
  })
