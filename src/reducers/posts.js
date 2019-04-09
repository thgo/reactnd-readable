import { RECEIVE_POSTS, SORT_POSTS } from '../actions/posts'
import _ from 'lodash'

export default function posts (state = {}, action) {
  switch (action.type) {
    case RECEIVE_POSTS :
      return action.posts
    case SORT_POSTS :
      console.log('Action', action)
      console.log('State', state)
      return action.sortBy === 'votes'
          ? _.sortBy(state, 'voteScore')
          : _.sortBy(state, 'timestamp')

    default :
      return state
  }
}