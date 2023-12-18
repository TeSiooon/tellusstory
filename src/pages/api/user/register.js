import bcrypt from "bcrypt";

const { MongoClient } = require("mongodb");

async function handler(req, res) {
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
    // console.log("exists");
    return new Error({ status: 400 }, { message: "User already exists" });
  }

  const result = await usersCollection.insertOne({
    name,
    email,
    hashedPassword,
  });
  // console.log(result);
  client.close();
}
export default handler;
