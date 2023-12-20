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
      <StoriesList stories={props.stories} />
    </Fragment>
  );
}

export async function getServerSideProps() {
  require("dotenv").config();
  const client = await MongoClient.connect(process.env.DATABASE_URL);

  const db = client.db("storiesDB");
  const storiesCollection = db.collection("stories");

  const data = await storiesCollection.find().toArray();
  const sortedResults = data.sort((a, b) => b.date - a.date);
  // console.log(sortedResults);

  const commentsCollection = db.collection("comments");
  const commentsData = await commentsCollection
    .find({ storyId: data[0]._id.toString() })
    .toArray();
  console.log(commentsData);
  client.close();

  return {
    props: {
      stories: sortedResults.map((story) => ({
        id: story._id.toString(),
        storyText: story.storyText,
      })),
    },
  };
}

// export async function getServerSideProps() {
//   require("dotenv").config();
//   const client = await MongoClient.connect(process.env.DATABASE_URL);

//   const db = client.db("storiesDB");
//   const storiesCollection = db.collection("stories");

//   const data = await storiesCollection.find().toArray();
//   const sortedResults = data.sort((a, b) => b.date - a.date);

//   // Pobieranie komentarzy dla każdej historii
//   const commentsCollection = db.collection("comments");

//   const storiesWithComments = await Promise.all(
//     sortedResults.map(async (story) => {
//       const commentsData = await commentsCollection
//         .find({ storyId: story._id.toString() })
//         .toArray();
//       return {
//         id: story._id.toString(),
//         storyText: story.storyText,
//         comments: commentsData
//           ? commentsData.map((comment) => ({
//               // id: comment._id.toString(),
//               text: comment.text,
//               date: comment.date,
//             }))
//           : [],
//       };
//     })
//   );

//   client.close();

//   return {
//     props: {
//       stories: storiesWithComments,
//     },
//   };
// }
