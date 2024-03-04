import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

const NewComment = (props) => {
  const commentTextRef = useRef();
  const storyId = props.storyId;
  const { data: session, status } = useSession();
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    const commentText = commentTextRef.current.value;
    const today = new Date();

    if (commentText.trim() !== "") {
      const commentData = {
        user: session.user.name,
        storyId,
        commentText,
        date: today,
      };

      const response = await fetch("/api/new-comment", {
        method: "POST",
        body: JSON.stringify(commentData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setErrorMessage("");
      // const data = await response.json();
      if (response.ok) {
        router.reload();
      }
    } else {
      setErrorMessage("Brak tresci komentarza");
    }
  };
  return (
    <>
      {status === "unauthenticated" ? (
        <p>You must be logged in to add comment</p>
      ) : (
        <div className=" flex flex-col justify-center items-center py-2">
          <p className="text-2xl my-2"></p>
          <form onSubmit={submitHandler} className="flex flex-col w-full">
            <div>
              <input
                className="w-full"
                type="text"
                required
                id="comment"
                ref={commentTextRef}
              />
            </div>
            <div className="relative py-2 flex-col">
              {errorMessage && (
                <p className="text-red-700 font-bold">{errorMessage}</p>
              )}
              <button className=" rounded-md bg-slate-500 p-1">
                Add comment
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default NewComment;
