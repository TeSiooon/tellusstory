import { Inter } from "next/font/google";
import Head from "next/head";
import { Fragment } from "react";
import StoriesList from "@/components/stories/StoriesList";
import { MongoClient } from "mongodb";

const inter = Inter({ subsets: ["latin"] });

export default function Home(props) {
  // console.log(props);
  return (
    <Fragment>
      <Head>
        <title>Tell Us Story</title>
        <meta name="TUS" description="Browse stories around the world" />
      </Head>
      <StoriesList stories={props.storiesWithComments} />
    </Fragment>
  );
}

export async function getServerSideProps() {
  require("dotenv").config();
  const client = await MongoClient.connect(process.env.DATABASE_URL);

  const db = client.db("storiesDB");
  const storiesCollection = db.collection("stories");
  const data = await storiesCollection.find().sort({ date: -1 }).toArray();
  // console.log("Filtered and sorted stories", data);

  const commentsCollection = db.collection("comments");

  const storiesWithComments = await Promise.all(
    data.map(async (story) => {
      const commentsData = await commentsCollection
        .find({
          storyId: story._id.toString(),
        })
        .toArray();
      // console.log(`Comments for Story ${story._id}:`, commentsData);
      return {
        id: story._id.toString(),
        storyText: story.storyText,
        comments: commentsData
          ? commentsData.map((comment) => ({
              id: comment._id.toString(),
              text: comment.commentText,
            }))
          : [],
      };
    })
  );

  client.close();

  return { props: { storiesWithComments } };
}
