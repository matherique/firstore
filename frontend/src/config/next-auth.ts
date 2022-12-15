import { User } from "@models";
import { loginSchema } from "@shared/validations/user";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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

        const result = await fetch("process.env.API_ENDPOINTuser/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: creds.email,
            password: creds.password,
          }),
        }).catch((err) => console.error(err))

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
          name: user.name,
          profile: user.profile,
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
        token.profile = user.profile;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.id = token.id as string;
        session.user.profile = token.profile as string;
      }

      return session;
    },
  },

  jwt: {
    secret: "super-secret",
    maxAge: 15 * 24 * 30 * 60, // 15 days
  },
  pages: {
    signIn: "/",
  },
  debug: true,
};
