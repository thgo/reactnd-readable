import { combineReducers } from 'redux'
import categories from './categories'
import posts from './posts'
import sortBy from './sortBy'
import category from './category'
import comments from './comments'

export default combineReducers({
  categories,
  posts,
  sortBy,
  category,
  comments
})