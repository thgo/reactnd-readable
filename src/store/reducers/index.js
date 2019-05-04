import { combineReducers } from 'redux'
import categories from './categoriesReducer'
import posts from './postsReducer'
import sortBy from './sortByReducer'
import category from './categoryReducer'
import comments from './commentsReducer'

export default combineReducers({
  categories,
  posts,
  sortBy,
  category,
  comments
})