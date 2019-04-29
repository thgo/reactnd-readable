import { getAllPostsAPI, votePostAPI, filterPostsAPI, addPostAPI, generateUID, deletePostAPI, getPostDetailsAPI } from '../../api/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SORT_POSTS = 'SORT_POSTS'
export const VOTE_POST = 'LIKE_POST'
export const FILTER_POSTS = 'FILTER_POSTS'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const POST_DETAILS = 'POST_DETAILS'

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
  return {
    type: FILTER_POSTS,
    posts,
    category,
  }
}

function addNewPost (post) {
  return {
    type: ADD_POST,
    post
  }
}

function deletePost (id) {
  return {
    type: DELETE_POST,
    id
  }
}

function receivePostDetails (post) {
  return {
    type: POST_DETAILS,
    post
  }
}

export function handleReceivePostDetails (id) {
  return (dispatch) => {
    dispatch(showLoading())
    return getPostDetailsAPI(id)
      .then(post => dispatch(receivePostDetails(post)))
      .then(() => hideLoading())
      .catch((e) => {
        console.warn('Error in handleReveicePostDetails: ', e)
      })
  }
}

export function handleDeletePost (id) {
  return (dispatch) => {
    dispatch(showLoading())
    return deletePostAPI(id)
      .then((res) => {
        console.log('Retorno delete: ', res)
        dispatch(deletePost(id))
      })
      .then(() => hideLoading())
  }
}

export function handleAddNewPost ( title, body, author, category ) {
  return (dispatch) => {
    dispatch(showLoading())
    return addPostAPI({
      id: generateUID(),
      title,
      body,
      author,
      category,
    })
      .then((post) => {
        console.log('retorno: ', post)
        dispatch(addNewPost(post))
      })
      .then(() => hideLoading())
  }
}

export function handlePostsByCategory (category) {
  return (dispatch) => {
    dispatch(showLoading())
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
          .then(() => hideLoading())
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

export function getAllPosts() {
  return (dispatch) => {
    return getAllPostsAPI()
      .then((posts) => {
        dispatch(receivePosts(posts))
      })
      .catch((e) => {
        console.warn('Error in getAllPosts ', e)
      })
  }
}