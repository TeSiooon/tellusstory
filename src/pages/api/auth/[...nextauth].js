import { MongoClient } from "mongodb";
import NextAuth from "next-auth/next";
import bcrypt from "bcrypt";
import Credentials from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      cretentials: {
        // username: { label: "Username", type: "text", placeholder: "Username" },
        email: { label: "Username", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(cretendials) {
        if (!cretendials.email || !cretendials.password) {
          return null;
        }
        const client = await MongoClient.connect(process.env.DATABASE_URL);
        const db = client.db("storiesDB");
        const usersCollection = db.collection("users");

        const user = await usersCollection.findOne({
          email: cretendials.email,
        });

        if (!user) {
          throw new Error("User does not exists");
        }
        const passwordMatch = await bcrypt.compare(
          cretendials.password,
          user.hashedPassword
        );
        if (!passwordMatch) {
          throw new Error("Wrong password");
        }

        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
  // callbacks: {
  //   async session({ session, user, token }) {
  //     if (token.user) {
  //       session.user = { ...token.user };
  //     }
  //     return session;
  //   },
  //   async jwt({ token, user, account, profile }) {
  //     if (user) {
  //       token.user = { ...user };
  //     }
  //     return token;
  //   },
  // },
});
