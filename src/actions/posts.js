import { getAllPostsAPI, votePostAPI, filterPostsAPI } from '../api/api'
import _ from 'lodash'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SORT_POSTS = 'SORT_POSTS'
export const VOTE_POST = 'LIKE_POST'
export const FILTER_POSTS = 'FILTER_POSTS'

export function receivePosts (posts) {
  return {
    type: RECEIVE_POSTS,
    posts,
  }
}

export function handleSortPosts (sortBy) {
  return {
    type: SORT_POSTS,
    sortBy,
  }
}

function votePost(post, vote) {
  return {
    type: VOTE_POST,
    post,
    vote
  }
}

function getPostsByCategory (posts, category) {
  console.log('getPostsByCategory', category)
  return {
    type: FILTER_POSTS,
    posts,
    category,
  }
}

export function handlePostsByCategory (category) {
  return (dispatch) => {

    if (category === 'all') {
        return getAllPostsAPI()
          .then((posts) => {
            dispatch(receivePosts(posts))
          })
      } else {
        return filterPostsAPI(category)
          .then((posts) => {
            dispatch(getPostsByCategory(posts, category))
          })
      }
  }
}

export function handleVotePost (post, vote) {
  return (dispatch) => {
    dispatch(votePost(post, vote))

    return votePostAPI(post.id, vote)
      .catch((e) => {
        console.warn('Error in handleVotePost: ', e)
        dispatch(votePost(post, vote))
        alert('Deu erro no postVote')
      })
  }
}