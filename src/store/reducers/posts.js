import {
  RECEIVE_POSTS,
  SORT_POSTS,
  VOTE_POST,
  FILTER_POSTS,
  ADD_POST,
  DELETE_POST,
  POST_DETAILS
} from '../actions/posts'
import _ from 'lodash'

export default function posts (state = {}, action) {
  switch (action.type) {

    case RECEIVE_POSTS :
      return action.posts

    case SORT_POSTS :
      return action.sortBy === 'votes'
          ? _.sortBy(state, 'voteScore')
          : _.sortBy(state, 'timestamp')

    case VOTE_POST :

      const postPosition = Object.keys(state).filter(item =>
        state[item].id === action.post.id)

      return {
        ...state,
        [postPosition]: {
          ...state[postPosition],
            voteScore: action.vote === 'upVote'
              ? action.post.voteScore + 1
              : action.post.voteScore - 1
        }
      }

    case FILTER_POSTS :
      return action.category !== 'all'
        ? _.filter(action.posts, { category: action.category })
        : action.posts

    case ADD_POST :
      return {
        ...state,
        [state.length]: action.post
      }

    case DELETE_POST :
      return {
       ...state.filter(post => post.id !== action.id)
      }

    case POST_DETAILS :
      return [
        action.post
      ]

    default :
      return state
  }
}