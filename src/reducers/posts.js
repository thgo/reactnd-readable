import { RECEIVE_POSTS, SORT_POSTS, VOTE_POST } from '../actions/posts'
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

      console.log('BLA BLA BLA: ', action)
      return {
        ...state,
        [postPosition]: {
          ...state[postPosition],
            voteScore: action.post.vote === 'upVote'
              ? state[postPosition].voteScore + 1
              : state[postPosition].voteScore - 1
        }
      }

    default :
      return state
  }
}