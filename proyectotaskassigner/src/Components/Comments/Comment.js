const Comment = ({ comment }) => {
    return (
        <div>
        <h3>{comment.name}</h3>
        <p>{comment.body}</p>
        </div>
    );
};

export default Comment;