const { MongoClient } = require("mongodb");

require("dotenv").config();

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    if (!data.reportText || data.reportText.trim() === "") {
      return res.status(400).json({ message: "Report text is required" });
    }
    const client = await MongoClient.connect(process.env.DATABASE_URL);
    const db = client.db("storiesDB");
  }
}
