// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { userRouter } from "./user";
import { productRouter } from "./product";
import { stockRouter } from "./stock";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("user.", userRouter)
  .merge("product.", productRouter)
  .merge("stock.", stockRouter)

// export type definition of API
export type AppRouter = typeof appRouter;
