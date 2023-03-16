import { useContext } from 'react'

import { AppContext } from '../../App'
import './styles.scss'

const ScoreAction = ({ score, commentId }) => {
  const { dispatch } = useContext(AppContext)

  return (
    <div className="score-action">
      <button
        type="button"
        className="score-increment"
        onClick={() => dispatch({ type: 'incrementScore', id: commentId })}
      >
        +
      </button>
      <span>{score}</span>
      <button
        type="button"
        className="score-descrement"
        onClick={() => dispatch({ type: 'decrementScore', id: commentId })}
      >
        -
      </button>
    </div>
  )
}

export default ScoreAction
