import { useContext, useState } from 'react'

import ScoreAction from '../ScoreAction'
import ListItems from './ListItems'
import ModalConfirm from './ModalConfirm'
import CommentInput from '../CommentInput'
import CommentAction from './CommentAction'

import { AppContext } from '../../App'
import { timeFormat, timeDiff } from '../../utils'
import './styles.scss'

const Comment = ({
  content,
  createdAt,
  user,
  score,
  replies,
  id,
  isCurrentUser,
  replyingTo,
}) => {
  const { dispatch } = useContext(AppContext)
  const [showModal, setShowModal] = useState(false)
  const [showReply, setShowReply] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  if (isEdit) {
    return (
      <CommentInput
        commentId={id}
        isEdit
        hide={() => setIsEdit(false)}
        defaultValue={`@${replyingTo} ${content}`}
      />
    )
  }

  return (
    <div className="comment-wrapper">
      <div className="comment-row">
        <ScoreAction score={score} commentId={id} />
        <div style={{ flex: 1 }}>
          <div className="comment-header">
            <img src={user.image.png} alt="avatar" />
            <span className="username">
              {user.username}
              {isCurrentUser && <span className="curr-bag">you</span>}
            </span>
            <span>{timeFormat(timeDiff(createdAt, new Date()))}</span>
            <CommentAction
              isCurrentUser={isCurrentUser}
              onDelete={() => setShowModal(true)}
              onReply={() => setShowReply(true)}
              onEdit={() => setIsEdit(true)}
            />
          </div>
          <p className="comment-content">
            {replyingTo ? (
              <span className="tag-name">{`@${replyingTo}`}</span>
            ) : null}
            {content}
          </p>
          <div className="comment-footer only-mobile">
            <ScoreAction score={score} commentId={id} />
            <CommentAction
              isCurrentUser={isCurrentUser}
              onDelete={() => setShowModal(true)}
              onReply={() => setShowReply(true)}
              onEdit={() => setIsEdit(true)}
            />
          </div>
        </div>
      </div>

      {showReply && (
        <CommentInput commentId={id} hide={() => setShowReply(false)} />
      )}

      {replies?.length ? <ListItems items={replies} isReplyList /> : null}

      {showModal && (
        <ModalConfirm>
          <h2>Delete comment</h2>
          <p>
            Are you sure you want to delete this comment? This will remove the
            comment and can&#39;t be undone
          </p>
          <div className="btn-bottom">
            <button
              type="button"
              className="btn btn-cancel"
              onClick={() => setShowModal(false)}
            >
              no, cancel
            </button>
            <button
              type="button"
              className="btn btn-confirm"
              onClick={() => dispatch({ type: 'deleteComment', id })}
            >
              yes, delete
            </button>
          </div>
        </ModalConfirm>
      )}
    </div>
  )
}

export default Comment
