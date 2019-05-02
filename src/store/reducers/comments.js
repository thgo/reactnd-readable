import { RECEIVE_COMMENTS, ADD_COMMENT, DELETE_COMMENT, VOTE_COMMENT, EDIT_COMMENT } from '../actions/comments'

export default function comments (state = {}, action) {

  let commentPosition

  switch (action.type) {

    case RECEIVE_COMMENTS :
      return {
        ...action.comments
      }

    case ADD_COMMENT :
      return [
        ...Object.values(state),
        {
          ...action.comment
        }
      ]

    case DELETE_COMMENT :
      return Object.values(state).filter(comment => comment.id !== action.id)

    case VOTE_COMMENT :

      commentPosition = Object.keys(state)
        .filter(item => state[item].id === action.comment.id)

      return {
        ...state,
        [commentPosition]: {
          ...state[commentPosition],
            voteScore: action.vote === 'upVote'
              ? action.comment.voteScore + 1
              : action.comment.voteScore - 1
        }
      }

    case EDIT_COMMENT :
      commentPosition = Object.keys(state)
        .filter(item => state[item].id === action.comment.id)

      return {
        ...state,
        [commentPosition]: {
          ...action.comment
        }
      }

    default :
      return state
  }
}