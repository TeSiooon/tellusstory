import StoryDetail from "./StoryDetail";

const StoriesList = (props) => {
  console.log(props.stories);
  return (
    <div>
      <ul className="flex flex-col justify-center items-center">
        {props.stories.map((story) => (
          <StoryDetail
            key={story.id}
            storyText={story.storyText}
            id={story.id}
          />
        ))}
      </ul>
    </div>
  );
};

export default StoriesList;
