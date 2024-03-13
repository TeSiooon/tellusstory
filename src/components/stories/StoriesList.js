import StoryDetail from "./StoryDetail";

const StoriesList = (props) => {
  return (
    <div className="w-2/4 max-sm:w-11/12">
      <ul className="flex flex-col justify-center items-center">
        {props.stories.map((story) => (
          <StoryDetail
            key={story.id}
            storyText={story.storyText}
            id={story.id}
            comments={story.comments}
            authorName={story.authorName}
          />
        ))}
      </ul>
    </div>
  );
};

export default StoriesList;
