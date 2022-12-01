// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { userRouter } from "./user";
import { productRouter } from "./product";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("user.", userRouter)
  .merge("product.", productRouter)

// export type definition of API
export type AppRouter = typeof appRouter;
