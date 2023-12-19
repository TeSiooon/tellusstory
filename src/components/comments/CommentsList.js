const CommentsList = (props) => {
  console.log(props.comments);
  return (
    <div className="flex flex-col">
      <ul>
        {props.comments.map((comment) => (
          <li>
            <p>Author</p>
            {comment.commentText}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentsList;
