const { MongoClient, ObjectId } = require("mongodb");

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

    //Usuwanie historii
    const storiesCollection = db.collection("stories");
    await storiesCollection.deleteOne({ _id: new ObjectId(storyId) });

    //Usuwanie powiazanych raportow
    const reportsCollection = db.collection("reports");
    await reportsCollection.deleteMany({ storyId: storyId });

    return res
      .status(200)
      .json({ message: "Story adn reports deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export default handler;
