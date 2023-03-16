import { useContext } from 'react'
import { AppContext } from '../../App'

import Comment from './index'

const ListItems = ({ items, isReplyList }) => {
  const { state } = useContext(AppContext)
  return (
    <div className={`list-items ${isReplyList ? 'list-replies' : ''}`}>
      {items.map((comment) => (
        <Comment
          key={comment.id}
          isCurrentUser={state.currentUser.username === comment.user.username}
          {...comment}
        />
      ))}
    </div>
  )
}

export default ListItems
