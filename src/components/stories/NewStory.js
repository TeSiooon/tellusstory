import { useSession } from "next-auth/react";
import { useRef, useState } from "react";

const NewStory = (props) => {
  const storyTextInputRef = useRef();
  const [errorMessage, setErrorMessage] = useState("");

  const { data: session } = useSession();

  const submitHandler = (e) => {
    e.preventDefault();

    const storyText = storyTextInputRef.current.value;
    const today = new Date();

    if (storyText.trim() !== "") {
      const storyData = {
        storyText,
        date: today,
        comments: [],
      };

      props.onAddStory(storyData);
    } else {
      setErrorMessage("Brak tresci historii");
    }
  };

  return (
    <>
      {!session ? (
        <p className="text-red-700 font-bold">
          Musisz byc zalogowany aby dodac historie
        </p>
      ) : (
        <div className="w-1/2 flex flex-col justify-center items-center mt-10">
          <p className="text-2xl my-2">Share your story with us</p>
          <form onSubmit={submitHandler} className="flex flex-col w-full">
            <div>
              <textarea
                className="w-full max-h-50 min-h-10 resize-y overflow-auto border border-gray-300 rounded-md p-2 my-5"
                type="text"
                required
                rows="15"
                id="storyText"
                ref={storyTextInputRef}
              />
            </div>
            <div className="relative my-5">
              {errorMessage && (
                <p className="text-red-700 font-bold">{errorMessage}</p>
              )}
              <button className="bg-white text-black rounded-full drop-shadow-lg px-4 py-2">
                Add story
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default NewStory;
