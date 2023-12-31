import React, {useState} from "react";
import './Comment.css';

function CommentSection(){
    // stores a list of comments
    const [comment , setComment] = useState([]);
    //  store new comments
    const [newComment , setNewComment] = useState('');

    // adding a comment
    const addComment= () =>{
        if (newComment.trim() !==''){
            setComment([...comment, newComment]);
            setNewComment(''); // clears text field after adding comment
    }
};
// deleting comments
const deleteComment = (indexToDelete) => {
    const updatedComments = comment.filter((_, index) => index !== indexToDelete);
    setComment(updatedComments);
}

return (
    <div className = "comment-card">
        <h2>Comments</h2>
        <div className = "comment-list">
            {comment.map((comment, index)=> (
                <div style={{color:"white"}} key={index} className="comment">
                    {comment}
                    <button className="btn custom-btn" type="button" onClick={() => deleteComment(index)}>
                    Delete Comment
                    </button>
                    </div>
            ))}
        </div>
        <div className="new-comment">
            <textarea
            rows="4"
            placeholder="Comment here!"
            value={newComment}
            onChange={(e)=> setNewComment(e.target.value)}>
            </textarea>
             <button className="btn custom-btn" type="submit" onClick={addComment}>
            Add Comment
          </button>
        </div>
    </div>
);
}
export default CommentSection;
