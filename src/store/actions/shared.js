import { getInitialData } from '../../api/api'
import { receiveCategories } from './categories'
import { receivePosts } from './posts'

export function handleInitialData () {
  return (dispatch) => {
    return getInitialData()
      .then(({ categories, posts }) => {
        dispatch(receiveCategories(categories))
        dispatch(receivePosts(posts))
      })
  }
}