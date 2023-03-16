import { useRef, useEffect } from 'react'
import { useContext, useState } from 'react'

import { AppContext } from '../../App'
import './styles.scss'

const autosize = (target) => {
  target.style.height = 'inherit'

  const computed = window.getComputedStyle(target)
  const height =
    parseInt(computed.getPropertyValue('border-top-width'), 10) +
    parseInt(computed.getPropertyValue('padding-top'), 10) +
    target.scrollHeight +
    parseInt(computed.getPropertyValue('padding-bottom'), 10) +
    parseInt(computed.getPropertyValue('border-bottom-width'), 10) +
    10

  target.style.height = `${height}px`
}

const CommentInput = ({ isEdit, commentId, hide, defaultValue = '' }) => {
  const {
    state: { currentUser },
    dispatch,
  } = useContext(AppContext)
  const [txtValue, setTxtValue] = useState(defaultValue)
  const submitButtonText = isEdit ? 'update' : commentId ? 'reply' : 'send'
  const textareaRef = useRef(null)

  useEffect(() => {
    autosize(textareaRef.current)
  }, [])

  const sendReply = () => {
    const currentTime = new Date()
    const payload = {
      comment: {
        id: +currentTime,
        content: txtValue,
        createdAt: currentTime,
        score: 0,
        user: currentUser,
        replies: [],
      },
      commentId,
    }
    dispatch({ type: 'addComment', payload })
  }

  const updateComment = () => {
    const payload = {
      id: commentId,
      content: txtValue,
    }
    dispatch({ type: 'updateComment', payload })
  }

  const submit = () => {
    if (isEdit) {
      updateComment()
    } else {
      sendReply()
    }

    setTxtValue('')
    if (hide) hide()
  }

  const handleKeyDown = (e) => {
    autosize(e.target)
  }

  return (
    <div className="reply-wrapper">
      <img src={currentUser.image.png} alt="avatar" />
      <textarea
        ref={textareaRef}
        name="reply"
        placeholder="Add a comment..."
        value={txtValue}
        onChange={(e) => setTxtValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        type="button"
        className="submit-btn"
        onClick={submit}
        disabled={!txtValue}
      >
        {submitButtonText}
      </button>
    </div>
  )
}

export default CommentInput
