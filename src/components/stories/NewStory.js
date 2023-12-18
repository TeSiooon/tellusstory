import { useRef } from "react";

const NewStory = (props) => {
  const storyTextInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const storyText = storyTextInputRef.current.value;
    const today = new Date();

    const storyData = {
      storyText,
      date: today,
      comments: [],
    };

    props.onAddStory(storyData);
  };

  return (
    <div className="w-1/2 flex flex-col justify-center items-center">
      <p className="text-2xl my-2">Share your story with us</p>
      <form onSubmit={submitHandler} className="flex flex-col w-full">
        <div>
          <textarea
            className="w-full"
            type="text"
            required
            rows="15"
            id="storyText"
            ref={storyTextInputRef}
          />
        </div>
        <div className="relative">
          <button className=" rounded-md bg-slate-500">Add story</button>
        </div>
      </form>
    </div>
  );
};

export default NewStory;
