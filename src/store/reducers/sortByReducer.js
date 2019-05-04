import { SORT_BY } from '../actions/sortByActions'

export default function sortBy (state = {}, action) {
  switch (action.type) {
    case SORT_BY :
      return action.sortBy
    default:
      return state
  }
}