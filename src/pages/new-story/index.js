import NewStory from "@/components/stories/NewStory";

const index = (props) => {
  const addStoryHandler = async (enteredStoryData) => {
    const response = await fetch("/api/new-story", {
      method: "POST",
      body: JSON.stringify(enteredStoryData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
  };

  return (
    <div>
      <NewStory onAddStory={addStoryHandler} />
    </div>
  );
};

export default index;
