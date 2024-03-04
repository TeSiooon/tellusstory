import { MongoClient } from "mongodb";

require("dotenv").config();

async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const data = req.body;
      if (!data.storyText || data.storyText.trim() === "") {
        return res.status(400).json({ message: "Story text is required" });
      }
      const client = await MongoClient.connect(process.env.DATABASE_URL);
      const db = client.db("storiesDB");

      const storiesCollection = db.collection("stories");

      const result = await storiesCollection.insertOne(data);

      client.close();

      res.status(201).json({ message: "Story added" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export default handler;
