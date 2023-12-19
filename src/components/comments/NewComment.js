import { useRouter } from "next/router";
import { useRef } from "react";

const NewComment = (props) => {
  const router = useRouter();
  const commentTextRef = useRef();
  console.log(router.storyId);

  const submitHandler = (e) => {
    e.preventDefault();
    const commentText = commentTextRef.current.value;
    const today = new Date();

    const commentData = {
      commentText,
      date: today,
    };
  };
  return (
    <div className="w-1/2 flex flex-col justify-center items-center">
      <p className="text-2xl my-2">Share your story with us</p>
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
          <button className=" rounded-md bg-slate-500">Add story</button>
        </div>
      </form>
    </div>
  );
};

export default NewComment;
