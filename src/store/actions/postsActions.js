import {
  getAllPostsAPI,
  votePostAPI,
  filterPostsAPI,
  addPostAPI,
  generateUID,
  deletePostAPI,
  getPostDetailsAPI,
  editPostAPI
} from '../../api/api'
import { toggleCategory } from './categoryActions'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const VOTE_POST = 'LIKE_POST'
export const FILTER_POSTS = 'FILTER_POSTS'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const POST_DETAILS = 'POST_DETAILS'

export function receivePosts (posts) {
  return {
    type: RECEIVE_POSTS,
    posts,
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

function editPost (post) {
  return {
    type: EDIT_POST,
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
  return dispatch => {
    return getPostDetailsAPI(id)
      .then(post => dispatch(receivePostDetails(post)))
      .catch((e) => {
        console.warn('Error in handleReveicePostDetails: ', e)
      })
  }
}

export function handleDeletePost (id) {
  return dispatch => {
    return deletePostAPI(id)
      .then(() => dispatch(deletePost(id)))
  }
}

export function handleAddNewPost ( title, body, author, category ) {
  return dispatch => {
    return addPostAPI({
      id: generateUID(),
      title,
      body,
      author,
      category,
      timestamp: new Date().getTime()
    })
      .then((post) => dispatch(addNewPost(post)))
  }
}

export function handleEditPost ( id, title, body ) {
  return dispatch => {
    return editPostAPI(id, title, body)
      .then(post => dispatch(editPost(post)))
      .catch((e) => {
        console.warn('Error in handleEditPost: ', e)
      })
  }
}

export function handlePostsByCategory (category) {
  return dispatch => {
    console.log('handlePostsByCategory foi chamado: ', category)
    if (category === 'all') {
        return getAllPostsAPI()
          .then((posts) => {
            dispatch(toggleCategory(category))
            dispatch(receivePosts(posts))
          })
      } else {
        return filterPostsAPI(category)
          .then((posts) => {
            dispatch(toggleCategory(category))
            dispatch(getPostsByCategory(posts, category))
          })
      }
  }
}

export function handleVotePost (post, vote) {
  return dispatch => {
    dispatch(votePost(post, vote))

    return votePostAPI(post.id, vote)
      .catch((e) => {
        console.warn('Error in handleVotePost: ', e)
        dispatch(votePost(post, vote))
      })
  }
}

export function getAllPosts() {
  return dispatch => {
    console.log('getAllPosts foi chamado!')
    return getAllPostsAPI()
      .then((posts) => {
        dispatch(receivePosts(posts))
      })
      .catch((e) => {
        console.warn('Error in getAllPosts ', e)
      })
  }
}