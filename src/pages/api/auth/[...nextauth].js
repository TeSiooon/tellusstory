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
          email: email,
        });

        if (!user) {
          return null;
        }
        const passwordMatch = await bcrypt.compare(
          cretendials.password,
          user.hashedPassword
        );
        if (!passwordMatch) {
          return null;
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
});
