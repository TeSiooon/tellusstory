import { MongoClient } from "mongodb";

export default async (req, res) => {
  if (req.method === "POST") {
    const { username, password } = req.body;

    const client = await MongoClient.connect(process.env.DATABASE_URL);
    const usersCollection = client.db().collection("users");

    const existingUser = await usersCollection.findOne({ username });

    if (existingUser) {
      res
        .status(422)
        .json({ success: false, message: "Username already exists" });
      client.close();
      return;
    }

    const newUser = {
      username,
      password,
    };

    await usersCollection.insertOne(newUser);

    res
      .status(201)
      .json({ success: true, message: "User created successfully" });
    client.close();
  }
};
