import { MongoClient } from "mongodb";

export default async (req, res) => {
  if (req.method === "POST") {
    const { username, password } = req.body;

    const client = await MongoClient.connect(process.env.DATABASE_URL);
    const usersCollection = client.db().collection("users");

    const user = await usersCollection.findOne({ username });

    if (user && user.password === password) {
      res.status(200).json({ success: true, message: "Login successful" });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    client.close();
  }
};
