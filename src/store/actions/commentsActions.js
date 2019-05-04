import {
  addCommentAPI,
  getPostCommentsAPI,
  deleteCommentAPI,
  voteCommentAPI,
  generateUID,
  editCommentAPI
} from '../../api/api'
import { handleReceivePostDetails } from './postsActions'
import _ from 'lodash'

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'

export function receiveComments (comments) {
  return {
    type: RECEIVE_COMMENTS,
    comments,
  }
}

function addComment (comment) {
  return {
    type: ADD_COMMENT,
    comment
  }
}

function deleteComment (id) {
  return {
    type: DELETE_COMMENT,
    id
  }
}

function voteComment(comment, vote) {
  return {
    type: VOTE_COMMENT,
    comment,
    vote
  }
}

function editComment (comment) {
  return {
    type: EDIT_COMMENT,
    comment
  }
}

export function handleReceiveComments (parentId) {
  return dispatch => {
    return getPostCommentsAPI(parentId)
      .then(comments => dispatch(receiveComments(comments)))
  }
}

export function handleAddComment (comment) {
  return (dispatch, getState) => {
    const { posts } = getState()
    const post = _.find(posts, {id: comment.parentId})

    return addCommentAPI({
      ...comment,
      id: generateUID(),
      timestamp: new Date().getTime()
    })
      .then(comment => dispatch(addComment(comment.data)))
      .then(() => dispatch(handleReceivePostDetails(post.id)))
      .catch((e) => {
        console.warn('Error in handleAddComment: ', e)
      })
  }
}

export function handleDeleteComment (comment) {
  return dispatch => {
    return deleteCommentAPI(comment.id)
      .then(() => dispatch(deleteComment(comment.id)))
      .then(() => dispatch(handleReceivePostDetails(comment.parentId)))
  }
}

export function handleVoteComment (comment, vote) {
  return dispatch => {
    dispatch(voteComment(comment, vote))

    return voteCommentAPI(comment.id, vote)
      .catch((e) => {
        console.warn('Error in handleVoteComment: ', e)
        dispatch(voteComment(comment, vote))
      })
  }
}

export function handleEditComment (comment, body) {
  return dispatch => {
    return editCommentAPI(comment.id, body)
      .then(comment => dispatch(editComment(comment)))
      .catch(e => {
        console.warn('Error in handleEditComment: ', e)
        dispatch(editComment(comment))
      })
  }
}