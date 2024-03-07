import { Inter } from "next/font/google";
import Head from "next/head";
import { Fragment, Suspense } from "react";
import StoriesList from "@/components/stories/StoriesList";
import { MongoClient } from "mongodb";
import StoriesLoading from "@/components/stories/StoriesLoading";

const inter = Inter({ subsets: ["latin"] });

export default function Home(props) {
  // console.log(props);
  return (
    <Fragment>
      <Head>
        <title>Tell Us Story</title>
        <meta name="TUS" description="Browse stories around the world" />
      </Head>
      <Suspense fallback={<StoriesLoading />}>
        <StoriesList stories={props.storiesWithComments} />
      </Suspense>
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

      return {
        id: story._id.toString(),
        storyText: story.storyText,
        comments: commentsData
          ? commentsData.map((comment) => ({
              id: comment._id.toString(),
              text: comment.commentText,
              user: comment.user,
            }))
          : [],
      };
    })
  );

  client.close();
  // console.log(storiesWithComments.comments);

  return { props: { storiesWithComments } };
}
