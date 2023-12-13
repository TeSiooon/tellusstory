import { MongoClient } from "mongodb";
import NextAuth from "next-auth/next";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      cretendials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(cretendials) {
        const client = await MongoClient.connect(process.env.DATABASE_URL);
        const user = await usersCollection.findOne({
          username: cretendials.username,
        });

        if (user && user.password === cretendials.password) {
          client.close();
          return Promise.resolve(user);
        } else {
          client.close();
          return Promise.resolve(null);
        }
      },
    }),
  ],
  session: {
    jwt: true,
  },
});
