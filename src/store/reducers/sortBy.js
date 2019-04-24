import { SORT_BY } from '../actions/sortBy'

export default function sortBy (state = {}, action) {
  switch (action.type) {
    case SORT_BY :
      return action.sortBy
    default:
      return state
  }
}