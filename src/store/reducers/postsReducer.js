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

  let postPosition = null

  switch (action.type) {

    case RECEIVE_POSTS :
      return action.posts

    case VOTE_POST :
      postPosition = getPostPosition(state, action.post)
      return [
        ...state.slice(0, postPosition),
        {
           ...state[postPosition],
           voteScore: action.vote === 'upVote'
           ? action.post.voteScore + 1
           : action.post.voteScore - 1
        },
        ...state.slice(postPosition + 1)
     ]

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
      postPosition = getPostPosition(state, action.post)
      return [
        ...state.slice(0, postPosition),
        {
          ...state[postPosition],
          title: action.post.title,
          body: action.post.body
        },
        ...state.slice(postPosition + 1)
     ]

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

function getPostPosition(posts, post) {
  return posts.findIndex(item => item.id === post.id)
}