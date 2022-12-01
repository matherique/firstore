import { Product } from "@prisma/client";
import { z } from "zod";
import { createRouter } from "./context";

export const productRouter = createRouter().query("getAll", {
  input: z.object({ query: z.string().optional() }),
  async resolve({ input: { query } }) {
    let products: Product[] | undefined = []
    if (query) {
      products = await prisma?.product.findMany({ where: { name: { contains: query } } })
    } else {
      products = await prisma?.product.findMany()
    }

    if (!products) throw new Error("could not find products")

    console.log(products)

    return products
  }
});
//   .mutation("login", {
//     input: loginSchema,
//     async resolve({ input }) {
//       const user = await prisma?.user.findFirst({
//         where: { email: input.email },
//       });

//       if (!user) {
//         throw new TRPCError({
//           code: "NOT_FOUND",
//           message: "user not found",
//         });
//       }

//       if (!compare(user.password, input.password)) {
//         throw new TRPCError({
//           code: "BAD_REQUEST",
//           message: "invalid email or password",
//         });
//       }

//       return user;
//     },
//   })
//   .query("getAll", {
//     input: searchSchema,
//     async resolve({ input: { query } }) {
//       let users: User[] | undefined = []
//       if (query) {
//         users = await prisma?.user.findMany({ where: { name: { contains: query } } })
//       } else {
//         users = await prisma?.user.findMany()
//       }

//       if (!users) throw new Error("could not find cakes")

//       return users
//     },
//   }).mutation("create", {
//     input: createSchema,
//     async resolve({ input }) {
//       const hashed = await hash(input.password);

//       const user = await prisma?.user.create({
//         data: {
//           name: input.name,
//           email: input.email,
//           password: hashed,
//           profile: Profile.ENPLOYEE,
//         },
//       });

//       if (!user) throw new Error("could not create user");

//       return user;
//     },
//   }).mutation("delete", {
//     input: deleteByIdSchema,
//     async resolve({ input }) {
//       await prisma?.user.delete({ where: { id: input.id } })
//     }
//   }).query("get", {
//     input: z.string(),
//     async resolve({ input: id }) {
//       const user = await prisma?.user.findUnique({ where: { id } })

//       if (!user) throw new Error("could not find user")

//       return user
//     }
//   }).mutation("update", {
//     input: updateSchema,
//     async resolve({ input }) {
//       let user: User | undefined = undefined;
//       if (input.password) {
//         user = await prisma?.user.update({
//           where: { id: input.id },
//           data: {
//             name: input.name,
//             email: input.email,
//             profile: input.profile as Profile,
//             password: await hash(input.password)
//           }
//         });
//       } else {
//         user = await prisma?.user.update({
//           where: { id: input.id },
//           data: {
//             name: input.name,
//             email: input.email,
//             profile: input.profile as Profile,
//           }
//         });
//       }

//       if (!user) throw new Error("could not update user");

//       return user;
//     }
//   })
// c