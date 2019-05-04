import { getInitialData } from '../../api/api'
import { receiveCategories } from './categoriesActions'
import { receivePosts } from './postsActions'

export function handleInitialData () {
  return (dispatch) => {
    return getInitialData()
      .then(({ categories, posts }) => {
        dispatch(receivePosts(posts))
        dispatch(receiveCategories(categories))
      })
  }
}