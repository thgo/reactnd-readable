import { combineReducers } from 'redux'
import categories from './categories'
import posts from './posts'
import sortBy from './sortBy'
import category from './category'
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
  categories,
  posts,
  sortBy,
  category,
  loadingBar: loadingBarReducer
})