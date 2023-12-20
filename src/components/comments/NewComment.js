import { useSession } from "next-auth/react";
import { useRef } from "react";

const NewComment = (props) => {
  const commentTextRef = useRef();
  const storyId = props.storyId;
  const { data: session, status } = useSession();

  const submitHandler = (e) => {
    e.preventDefault();
    const commentText = commentTextRef.current.value;
    const today = new Date();

    const commentData = {
      user: session.user.name,
      storyId,
      commentText,
      date: today,
    };
    console.log(commentData);
  };
  return (
    <div className="w-1/2 flex flex-col justify-center items-center">
      <p className="text-2xl my-2"></p>
      <form onSubmit={submitHandler} className="flex flex-col w-full">
        <div>
          <input
            className="w-full"
            type="text"
            required
            // rows="15"
            id="comment"
            ref={commentTextRef}
          />
        </div>
        <div className="relative">
          <button className=" rounded-md bg-slate-500">Add comment</button>
        </div>
      </form>
    </div>
  );
};

export default NewComment;
