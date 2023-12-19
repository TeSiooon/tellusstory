import CommentsList from "@/components/comments/CommentsList";
import NewComment from "@/components/comments/NewComment";
import Story from "@/components/stories/Story";
import { MongoClient, ObjectId } from "mongodb";

const index = (props) => {
  console.log("test komentarzy");
  console.log(props.comments);
  return (
    <div>
      <Story storyText={props.story.storyText} />
      <CommentsList comments={props.comments} />
      {/* <NewComment /> */}
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
        commentText: comment.commentText,
      })),
    },
  };
}
