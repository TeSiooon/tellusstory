const CommentsList = (props) => {
  console.log(props.comments);
  return (
    <div>
      <ul>
        {props.comments.map((comment) => (
          <li key={comment.id} className="pt-2">
            <p className="bg-gray-900 px-2">{comment.user}</p>
            <p>{comment.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentsList;
