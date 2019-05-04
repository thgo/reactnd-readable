import { TOGGLE_CATEGORY } from '../actions/categoryActions'

export default function categories (state = {}, action) {
  switch (action.type) {
    case TOGGLE_CATEGORY :
      return action.category
    default :
      return state
  }
}