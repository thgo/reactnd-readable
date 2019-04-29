import { showLoading, hideLoading } from 'react-redux-loading'
import { addCommentAPI, getPostCommentsAPI, deleteCommentAPI, voteCommentAPI } from '../../api/api'

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'

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
export function handleReceiveComments (parentId) {
  return dispatch => {
    dispatch(showLoading())

    return getPostCommentsAPI(parentId)
      .then(comments => dispatch(receiveComments(comments)))
      .then(() => hideLoading())
  }
}

export function handleAddComment (comment) {
  return dispatch => {
    dispatch(showLoading())

    return addCommentAPI(comment)
      .then(comment => dispatch(addComment(comment.data)))
      .then(() => hideLoading())
  }
}

export function handleDeleteComment (id) {
  return dispatch => {
    dispatch(showLoading())

    return deleteCommentAPI(id)
      .then(() => dispatch(deleteComment(id)))
      .then(() => hideLoading())
  }
}

export function handleVoteComment (comment, vote) {
  return dispatch => {
    dispatch(voteComment(comment, vote))

    return voteCommentAPI(comment.id, vote)
      .catch((e) => {
        console.warn('Error in handleVoteComment: ', e)
        dispatch(voteComment(comment, vote))
        alert('Deu erro no postVote')
      })
  }
}