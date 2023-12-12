import StoryDetail from "./StoryDetail";

const StoriesList = (props) => {
  console.log(props.stories);
  return (
    <ul>
      {props.stories.map((story) => (
        <StoryDetail key={story.id} storyText={story.storyText} />
      ))}
    </ul>
  );
};

export default StoriesList;
