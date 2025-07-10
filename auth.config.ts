import { type NextAuthConfig, CredentialsSignin } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./lib/prisma";
const authOptions: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        console.log("Authorize called with:", credentials);
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });

        if (!user) {
          console.log("User not found");
          return null;
        }

        if (!user.password) {
          console.log("User has no password");
          return null;
        }
        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isPasswordValid) {
          console.log("Invalid password");
          return null;
        }

        // console.log("User authenticated:", user);
        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  trustHost: true,
  callbacks: {
    jwt: async ({ user, token }) => {
      if (user) {
        token.userId = user.id;
        token.sub = user.id; // Ensure sub is set for NextAuth
      }
      console.log("JWT callback - token:", token);
      return token;
    },
    session: async ({ session, token }) => {
      if (token && session.user) {
        //@ts-ignore
        session.user.id = token.userId as string;
        console.log("Session callback - session:", session);
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
};
export default authOptions;
