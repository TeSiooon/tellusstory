const { MongoClient } = require("mongodb");

require("dotenv").config();

async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const { storyId } = req.query;
  console.log(storyId);

  try {
    const client = await MongoClient.connect(process.env.DATABASE_URL);
    const db = client.db("storiesDB");
    const reportsCollection = db.collection("reports");
    await reportsCollection.deleteMany({ storyId: storyId });
    return res.status(200).json({ message: "Reports deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export default handler;
