import CommentsList from "@/components/comments/CommentsList";
import NewComment from "@/components/comments/NewComment";
import Story from "@/components/stories/Story";
import { MongoClient, ObjectId } from "mongodb";

const index = (props) => {
  console.log("test komentarzy");
  console.log(props.comments);
  return (
    <div className="flex flex-col w-2/4 justify-center items-center bg-orange-800 my-8">
      <div className="flex w-full bg-slate-600 px-8">
        <p className="w-1/2">Autor</p>
      </div>
      <div className="bg-red-200">
        <p>{props.story.storyText}</p>
      </div>

      <div className="w-full bg-green-200">
        Comments
        <div>
          <CommentsList comments={props.comments} />
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
        commentText: comment.commentText,
      })),
    },
  };
}
