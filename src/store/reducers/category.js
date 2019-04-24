import { TOGGLE_CATEGORY } from '../actions/category'

export default function categories (state = {}, action) {
  switch (action.type) {
    case TOGGLE_CATEGORY :
      return action.category
    default :
      return state
  }
}