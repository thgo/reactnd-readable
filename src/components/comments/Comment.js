import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Icon, Comment, Grid, Form, Button, Segment } from 'semantic-ui-react'
import { handleDeleteComment, handleVoteComment, handleEditComment } from '../../store/actions/commentsActions'
import { formatDate } from '../../utils/utils'
import Moment from 'react-moment'
import Options from '../commons/Options'
import { bindActionCreators } from 'redux';

class CommentComponent extends Component {
  state = {
    isEditing: false,
    body: ''
  }

  handleClickVote = (e, vote) => {
    e.preventDefault()
    const { handleVoteComment, comment } = this.props
    handleVoteComment(comment, vote)
  }

  handleDeleteComment = e => {
    e.preventDefault()
    const { handleDeleteComment, comment } = this.props
    handleDeleteComment(comment)
  }

  handleEditComment = e => {
    e.preventDefault()
    const { comment } = this.props
    this.setState({
      isEditing: true,
      body: comment.body
    })
  }

  handleCancelEditComment = e => {
    if (e) {
      e.preventDefault()
    }

    this.setState({
      isEditing: false,
      body: ''
    })
  }

  handleSaveEditComment = e => {
    e.preventDefault()
    const { comment, handleEditComment } = this.props
    const { body }  = this.state

    handleEditComment(comment, body)
    this.handleCancelEditComment()
  }

  handleChange = (e, { name, value }) => {
    e.preventDefault()

    this.setState({
      [name]: value
    })
  }

  render() {
    const { comment } = this.props
    const { isEditing, body } = this.state

    return (
      <Comment>
        <Comment.Avatar as='a' src='/user.svg' />
        <Comment.Content>
          <Comment.Author>{comment.author}</Comment.Author>

          <Comment.Metadata style={{ marginLeft: 0 }}>
            <div>
              <Moment
                fromNow
                date={new Date(comment.timestamp)}
                title={formatDate(comment.timestamp)}
              />
            </div>
            | {' '}
            <div>
              <Icon name='star' />
              {comment.voteScore} votes
            </div>
          </Comment.Metadata>

          <Comment.Text>
            {isEditing === true ? (
              <Segment raised clearing>
                <Form onSubmit={this.handleSubmit}>
                  <Form.TextArea
                    label='Message *'
                    placeholder='Message'
                    name='body'
                    value={body}
                    onChange={this.handleChange}
                  />
                  <Button.Group floated='right'>
                    <Button
                      positive
                      content='Save'
                      disabled={body === ''}
                      onClick={this.handleSaveEditComment} />
                    <Button.Or />
                    <Button color='red' content='Cancel' onClick={this.handleCancelEditComment} />
                  </Button.Group>
                </Form>
              </Segment>
            ) : (
              <p>{comment.body}</p>
            )}
          </Comment.Text>

          <Comment.Actions>
            <Grid columns='2'>
              <Grid.Column>
                <Comment.Action>
                  <Icon
                    link
                    name='thumbs up outline'
                    color='green'
                    title='Like this comment'
                    onClick={e => this.handleClickVote(e, 'upVote')}
                  />
                </Comment.Action>
                <Comment.Action>
                  <Icon
                    link
                    name='thumbs down outline'
                    color='red'
                    title='Dislike this comment'
                    onClick={e => this.handleClickVote(e, 'downVote')}
                  />
                </Comment.Action>
              </Grid.Column>
              <Grid.Column textAlign='right'>
                <Comment.Action>
                  <Options
                    handleEdit={this.handleEditComment}
                    handleDelete={this.handleDeleteComment}
                  />
                </Comment.Action>

              </Grid.Column>
            </Grid>
          </Comment.Actions>

        </Comment.Content>
      </Comment>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    handleVoteComment,
    handleDeleteComment,
    handleEditComment
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(CommentComponent)
