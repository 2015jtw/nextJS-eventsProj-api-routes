import classes from './comment-list.module.css';

function CommentList(props) {

  const {items} = props;

  return (
    <ul className={classes.comments}>
      {items.map((item) => {
        return(
          <li key={item._id}>
            <p>{item.comment.commentText}</p>
            <div>
              By <address>{item.comment.name}</address>
            </div>
          </li>
        )
        
      })}
    </ul>
  );
}

export default CommentList;
