import {
  RECEIVE_POSTS,
  VOTE_POST,
  FILTER_POSTS,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  POST_DETAILS
} from '../actions/postsActions'
import _ from 'lodash'

export default function posts (state = {}, action) {

  switch (action.type) {

    case RECEIVE_POSTS :
      return action.posts

    case VOTE_POST :
      return state.map(post => {
        if (post.id === action.post.id) {
          return {
            ...post,
            voteScore: action.vote === 'upVote'
            ? action.post.voteScore + 1
            : action.post.voteScore - 1
          }
        }
        return post
      })

    case FILTER_POSTS :
      return action.category !== 'all'
        ? _.filter(action.posts, { category: action.category })
        : action.posts

    case ADD_POST :
      return [
        ...state,
        {
          ...action.post
        }
      ]

    case EDIT_POST :
      return state.map(post => {
        if (post.id === action.post.id) {
          return {
            ...post,
            title: action.post.title,
            body: action.post.body
          }
        }
        return post
      })

    case DELETE_POST :
      return state.filter(post => post.id !== action.id)

    case POST_DETAILS :
      return [
        action.post
      ]

    default :
      return state
  }
}
