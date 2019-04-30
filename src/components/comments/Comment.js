import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Icon, Comment, Dropdown, Grid } from 'semantic-ui-react'
import { handleDeleteComment, handleVoteComment } from '../../store/actions/comments'
import { formatDate } from '../../utils/utils';
import Moment from 'react-moment';

class CommentComponent extends Component {

  handleClickUpVote = (e) => {
    e.preventDefault()
    const { dispatch, comment } = this.props

    dispatch(handleVoteComment(comment, 'upVote'))
  }

  handleClickDownVote = (e) => {
    e.preventDefault()
    const { dispatch, comment } = this.props

    dispatch(handleVoteComment(comment, 'downVote'))
  }

  handleDeleteComment = (e) => {
    e.preventDefault()
    const { dispatch, comment } = this.props

    dispatch(handleDeleteComment(comment.id))
  }

  render() {

    const { comment } = this.props

    return (
      <Comment>
        <Comment.Avatar
          as="a"
          src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Ei-user.svg"
        />
        <Comment.Content>
          <Comment.Author>{ comment.author }</Comment.Author>
          <Comment.Metadata style={{marginLeft: 0}}>
            <Moment fromNow date={new Date(comment.timestamp)} title={formatDate(comment.timestamp)}/>  |  { comment.voteScore } votes
          </Comment.Metadata>
          <Comment.Text>
            <p>{ comment.body }</p>
          </Comment.Text>
          <Comment.Actions>
              <Grid columns='2'>
                <Grid.Column>
                  <Comment.Action>
                    <Icon name='thumbs up outline' color='green' link onClick={this.handleClickUpVote} />
                  </Comment.Action>
                  <Comment.Action>
                    <Icon name='thumbs down outline' color='red' link onClick={this.handleClickDownVote} />
                  </Comment.Action>
                </Grid.Column>
                <Grid.Column textAlign='right'>
                  <Comment.Action>
                    <Dropdown icon="ellipsis vertical" title='Options' onClick={(e) => e.preventDefault()}>
                      <Dropdown.Menu>
                        <Dropdown.Item icon='edit outline' text='Edit' title='Edit this post' onClick={this.handleClickVote} />
                        <Dropdown.Item icon='trash alternate outline' text='Remove' title='Delete this post' onClick={this.handleDeleteComment} />
                      </Dropdown.Menu>
                    </Dropdown>
                  </Comment.Action>
                </Grid.Column>
              </Grid>
          </Comment.Actions>
        </Comment.Content>
      </Comment>
    )
  }
}

export default connect()(CommentComponent)