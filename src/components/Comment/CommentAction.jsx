import replyIcon from '../../assets/icon-reply.svg'
import deleteIcon from '../../assets/icon-delete.svg'
import editIcon from '../../assets/icon-edit.svg'

const CommentAction = ({ isCurrentUser, onDelete, onReply, onEdit }) => {
  return (
    <>
      {isCurrentUser ? (
        <div className="comment-actions">
          <button type="button" className="btn btn-delete" onClick={onDelete}>
            <img src={deleteIcon} alt="reply-icon" />
            Delete
          </button>
          <button type="button" className="btn" onClick={onEdit}>
            <img src={editIcon} alt="reply-icon" />
            Edit
          </button>
        </div>
      ) : (
        <button type="button" className="btn" onClick={onReply}>
          <img src={replyIcon} alt="reply-icon" />
          Reply
        </button>
      )}
    </>
  )
}

export default CommentAction
