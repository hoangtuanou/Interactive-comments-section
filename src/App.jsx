import { useReducer, createContext, useEffect } from 'react'

import ListItems from './components/Comment/ListItems'
import CommentInput from './components/CommentInput'

import './App.scss'

import MOCK_DATA from './mockData'

function reducer(state, action) {
  switch (action.type) {
    case 'incrementScore': {
      const newState = structuredClone(state)
      const comment = state.comments.find(({ id }) => id === action.id)

      if (comment) {
        return {
          ...newState,
          comments: newState.comments.map((comment) => {
            if (comment.id === action.id) {
              return {
                ...comment,
                score: ++comment.score,
              }
            }

            return comment
          }),
        }
      }

      return {
        ...state,
        comments: state.comments.map((comment) => {
          return {
            ...comment,
            replies: comment.replies.map((reply) => {
              if (reply.id === action.id) {
                return {
                  ...reply,
                  score: ++reply.score,
                }
              }
              return reply
            }),
          }
        }),
      }
    }
    case 'decrementScore': {
      const comment = state.comments.find(({ id }) => id === action.id)

      if (comment) {
        return {
          ...state,
          comments: state.comments.map((comment) => {
            if (comment.id === action.id) {
              return {
                ...comment,
                score: --comment.score,
              }
            }

            return comment
          }),
        }
      }

      return {
        ...state,
        comments: state.comments.map((comment) => {
          return {
            ...comment,
            replies: comment.replies.map((reply) => {
              if (reply.id === action.id) {
                return {
                  ...reply,
                  score: --reply.score,
                }
              }
              return reply
            }),
          }
        }),
      }
    }
    case 'deleteComment': {
      const comment = state.comments.find(({ id }) => id === action.id)

      if (comment) {
        return {
          ...state,
          comments: state.comments.filter(
            (comment) => comment.id !== action.id
          ),
        }
      }

      return {
        ...state,
        comments: state.comments.map((comment) => {
          return {
            ...comment,
            replies: comment.replies.filter((reply) => reply.id !== action.id),
          }
        }),
      }
    }
    case 'addComment': {
      if (action.payload.commentId) {
        return {
          ...state,
          comments: state.comments.map((comment) => {
            return {
              ...comment,
              replies:
                comment.id === action.payload.commentId
                  ? [...comment.replies, action.payload.comment]
                  : comment.replies.map((reply) => {
                      if (reply.id === action.payload.commentId) {
                        return {
                          ...reply,
                          replies: [
                            ...(reply.replies || []),
                            action.payload.comment,
                          ],
                        }
                      }
                      return reply
                    }),
            }
          }),
        }
      }
      return {
        ...state,
        comments: [...state.comments, action.payload.comment],
      }
    }
    case 'updateComment': {
      const newState = structuredClone(state)
      const comment = state.comments.find(({ id }) => id === action.payload.id)

      if (comment) {
        return {
          ...newState,
          comments: newState.comments.map((comment) => {
            if (comment.id === action.payload.id) {
              return {
                ...comment,
                content: action.payload.content,
              }
            }

            return comment
          }),
        }
      }

      return {
        ...state,
        comments: state.comments.map((comment) => {
          return {
            ...comment,
            replies: comment.replies.map((reply) => {
              if (reply.id === action.payload.id) {
                return {
                  ...reply,
                  content: action.payload.content,
                }
              }
              return reply
            }),
          }
        }),
      }
    }
    default:
      throw new Error()
  }
}

export const AppContext = createContext()

function App() {
  const [state, dispatch] = useReducer(reducer, MOCK_DATA)

  useEffect(() => {
    const body = document.querySelector('body')
    const modalDom = document.createElement('div')
    modalDom.setAttribute('id', 'modal-portal')

    body.appendChild(modalDom)
  }, [])

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <ListItems items={state.comments} />
        <CommentInput />
      </div>
    </AppContext.Provider>
  )
}

export default App
