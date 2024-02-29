import { useSession } from "next-auth/react";
import { useRef } from "react";

const NewComment = (props) => {
  const commentTextRef = useRef();
  const storyId = props.storyId;
  // console.log("current story", storyId);
  const { data: session, status } = useSession();

  const submitHandler = async (e) => {
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
    const response = await fetch("/api/new-comment", {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
  };
  return (
    <div className="w-1/2 flex flex-col justify-center items-center py-2">
      <p className="text-2xl my-2"></p>
      <form onSubmit={submitHandler} className="flex flex-col w-full">
        <div>
          <input
            className="w-full text-gray-900"
            type="text"
            required
            id="comment"
            ref={commentTextRef}
          />
        </div>
        <div className="relative py-2">
          <button className=" rounded-md bg-slate-500 p-1">Add comment</button>
        </div>
      </form>
    </div>
  );
};

export default NewComment;
