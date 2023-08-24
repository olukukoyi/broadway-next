import NextAuth, { NextAuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXT_AUTH_SECRET,
  pages: { signIn: "/sign-in" },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const existingUser = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (!existingUser) {
          return null;
        }

        const passwordMatch = await compare(
          credentials.password,
          existingUser.password || ""
        );

        if (!passwordMatch) {
          return null;
        }

        return {
          id: existingUser.id + "", // turn to string
          username: existingUser.username,
          email: existingUser.email,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "", // nullish operator, incase null on runtime
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "", // nullish operator, incase null on runtime
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // be default, jwt passes in name , image and email
        // we have to customize the token (include what we want) and pass to session
        return { ...token, username: user.username };
      }
      return token;
    },
    async session({ session, user, token }) {
      /// this works alone

      if (!token && !user) {
        console.log("No User or Token available");
      }

      const email = user?.email || token?.email;

      if (!email) {
        console.log("No email evailable in user or token");
        return session;
      }

      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      try {
        if (!existingUser) {
          const newUser = await prisma.user.create({
            data: {
              email,
              username: user?.name || "unknown",
              password: "",
            },
          });

          console.log("Created new user with email: ", email);
        } else {
          console.log("User already exist with email: ", email);
        }
      } catch (error) {
        console.log(error);
      }
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username,
        },
      };
    },
  },
};
