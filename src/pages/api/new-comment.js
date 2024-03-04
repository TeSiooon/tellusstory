const { MongoClient } = require("mongodb");

require("dotenv").config();

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    if (!data.commentText || data.commentText.trim() === "") {
      return res.status(400).json({ message: "Comment text is required" });
    }
    // console.log("dane komentarza", data);
    const client = await MongoClient.connect(process.env.DATABASE_URL);
    const db = client.db("storiesDB");
    const commentsCollection = db.collection("comments");

    //Dodanie komentarza
    const comment = await commentsCollection.insertOne(data);
    client.close();
    res.status(201).json({ message: "Comment added" });
  }
}

export default handler;
