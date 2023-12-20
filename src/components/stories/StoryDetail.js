import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import CommentsList from "../comments/CommentsList";

const StoryDetail = (props) => {
  const displayedId = props.id.slice(-6);
  // console.log(displayedId);
  const { data: session, status } = useSession();
  const [commentsVisible, setCommentsVisible] = useState(false);
  // console.log(props);

  const toggleCommentsVisibility = () => {
    setCommentsVisible((prev) => !prev);
  };
  return (
    <div className="flex flex-col justify-center items-center w-full bg-orange-800 my-8">
      <div className="flex w-full bg-slate-600 px-8">
        <p className="w-1/2">Autor</p>
        <Link href={`/${props.id}`} className="w-1/2 text-right">
          #{displayedId}
        </Link>
      </div>
      <div className="bg-red-200">
        <p>{props.storyText}</p>
      </div>

      <div className="w-full">
        Comments ({props.comments.length})
        <button onClick={toggleCommentsVisibility}>&#9650;</button>
        {commentsVisible && <CommentsList comments={props.comments} />}
      </div>
    </div>
  );
};

export default StoryDetail;
