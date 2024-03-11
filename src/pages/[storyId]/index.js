import CommentsList from "@/components/comments/CommentsList";

import { MongoClient, ObjectId } from "mongodb";

import classes from "./StoryDetail.module.css";
import NewComment from "@/components/comments/NewComment";
import { useParams } from "next/navigation";

const index = (props) => {
  const params = useParams();
  // console.log(params.storyId);
  return (
    <div
      className={`${classes.card} flex flex-col w-2/4 justify-center items-center  my-8 max-sm:w-3/4`}
    >
      <div className="flex w-full  px-8">
        <p className="w-1/2">Autor</p>
      </div>
      <div className={`${classes.card_text} flex w-full`}>
        <p className="p-3 ">{props.story.storyText}</p>
      </div>

      <div className="w-full p-2">
        Comments ({props.comments.length})
        <div className=" flex flex-col">
          <CommentsList comments={props.comments} />
          <NewComment storyId={params.storyId} />
        </div>
      </div>
    </div>
  );
};

export default index;

export async function getServerSideProps(context) {
  require("dotenv").config();
  const { storyId } = context.query;
  const client = await MongoClient.connect(process.env.DATABASE_URL);
  const db = client.db("storiesDB");
  const storiesCollection = db.collection("stories");
  const data = await storiesCollection.findOne({ _id: new ObjectId(storyId) });
  //comments
  const commentsCollection = db.collection("comments");
  const commentsData = await commentsCollection
    .find({ storyId: storyId })
    .toArray();

  client.close();

  return {
    props: {
      story: {
        storyText: data.storyText,
      },
      comments: commentsData.map((comment) => ({
        id: comment._id.toString(),
        text: comment.commentText,
        user: comment.user,
      })),
    },
  };
}
