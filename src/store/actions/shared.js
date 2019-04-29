import { getInitialData } from '../../api/api'
import { receiveCategories } from './categories'
import { receivePosts } from './posts'
import { showLoading, hideLoading } from 'react-redux-loading'

export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
      .then(({ categories, posts }) => {
        dispatch(receiveCategories(categories))
        dispatch(receivePosts(posts))
        dispatch(hideLoading())
      })
  }
}