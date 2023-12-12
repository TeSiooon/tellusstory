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
    };

    props.onAddStory(storyData);
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <label></label>
          <input
            type="textarea"
            required
            id="storyText"
            ref={storyTextInputRef}
          />
        </div>
        <div>
          <button>Add story</button>
        </div>
      </form>
    </div>
  );
};

export default NewStory;
