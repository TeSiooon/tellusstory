const CommentsList = (props) => {
  console.log(props.comments);
  return (
    <div className="bg-red-600">
      <ul>
        {props.comments.map((comment) => (
          <li key={comment.id}>
            <p>{comment.user}</p>
            {comment.commentText}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentsList;
