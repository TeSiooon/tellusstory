import { MongoClient } from "mongodb";
import NextAuth from "next-auth/next";
import bcrypt from "bcrypt";
import Credentials from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        // username: { label: "Username", type: "text", placeholder: "Username" },
        email: { label: "Username", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          return null;
        }

        const client = await MongoClient.connect(process.env.DATABASE_URL);
        const db = client.db("storiesDB");
        const usersCollection = db.collection("users");

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          throw new Error("User does not exists");
        }
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );
        if (!passwordMatch) {
          throw new Error("Wrong password");
        }

        user.role = user.role || "user";

        return user;
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role;
      }

      return session;
    },
  },
  // session: {
  //   strategy: "jwt",
  // },

  pages: {
    signIn: "/auth/signin",
  },
});
