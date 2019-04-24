import { getInitialData } from '../../api/api'
import { receiveCategories } from './categories'
import { toggleCategory } from './category'
import { receivePosts } from './posts'
import { showLoading, hideLoading } from 'react-redux-loading'
import { sortBy } from './sortBy';

const INITIAL_SORT = 'timestamp'

export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
      .then(({ categories, posts }) => {
        dispatch(receiveCategories(categories))
        dispatch(receivePosts(posts))
        dispatch(toggleCategory('all'))
        dispatch(sortBy(INITIAL_SORT))
        dispatch(hideLoading())
      })
  }
}