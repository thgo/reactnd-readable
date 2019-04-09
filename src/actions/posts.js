export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SORT_POSTS = 'SORT_POSTS'

export function receivePosts (posts) {
  return {
    type: RECEIVE_POSTS,
    posts,
  }
}

export function handleSortPosts (sortBy) {
  return {
    type: SORT_POSTS,
    sortBy
  }
}