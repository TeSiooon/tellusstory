import bcrypt from "bcrypt";

const { MongoClient } = require("mongodb");

async function handler(req, res) {
  try {
    const data = await req.body;
    const { name, email, password } = data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const client = await MongoClient.connect(process.env.DATABASE_URL);
    const db = client.db("storiesDB");
    const usersCollection = db.collection("users");

    const exist = await usersCollection.findOne({
      email: email,
    });
    if (exist) {
      console.log("exists");
      return res.status(400).json({ message: "User already exists" });
    }

    const result = await usersCollection.insertOne({
      name,
      email,
      hashedPassword,
    });
    // console.log(result);
    client.close();
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Interlan Server Error" });
  }
}
export default handler;
