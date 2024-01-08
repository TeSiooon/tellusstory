import { useSession } from "next-auth/react";
import Link from "next/link";
import CommentsList from "../comments/CommentsList";

const Story = (props) => {
  //   const displayedId = props.id.slice(-6);
  // console.log(displayedId);
  const { data: session, status } = useSession();
  return (
    <div className="flex flex-col justify-center items-center bg-orange-800 my-8">
      <div className="flex w-full bg-slate-600 px-8">
        <p className="w-1/2">Autor</p>
      </div>
      <div className="bg-red-200">
        <p>{props.storyText}</p>
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

export default Story;
