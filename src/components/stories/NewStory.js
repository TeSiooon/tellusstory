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
        <div className="w-1/2 flex flex-col justify-center items-center">
          <p className="text-2xl my-2">Share your story with us</p>
          <form onSubmit={submitHandler} className="flex flex-col w-full">
            <div>
              <textarea
                className="w-full text-gray-900"
                type="text"
                required
                rows="15"
                id="storyText"
                ref={storyTextInputRef}
              />
            </div>
            <div className="relative">
              {errorMessage && (
                <p className="text-red-700 font-bold">{errorMessage}</p>
              )}
              <button className="p-1 rounded-md bg-slate-500">Add story</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default NewStory;
