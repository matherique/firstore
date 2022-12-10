import { loginSchema } from "@shared/validations/user";
import { compare } from "@shared/encrypter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@server/db/client"
import { User } from "@prisma/client";

export const nextAuthConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Username",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        const creds = await loginSchema.parseAsync(credentials);

        const result = await fetch("http://localhost:1355/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: creds.email,
            password: creds.password,
          }),
        }).catch((err) => console.log(err))

        if (!result) {
          return null;
        }

        if (result.status !== 200) {
          return null
        }

        const user = await result.json() as User

        return {
          id: user.id,
          email: user.email,
          name: user.name
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.id = token.id as string;
      }

      return session;
    },
  },

  jwt: {
    secret: "super-secret",
    maxAge: 15 * 24 * 30 * 60, // 15 days
  },
  pages: {
    signIn: "/criar-conta",
    newUser: "/entrar",
  },
  debug: true,
};
