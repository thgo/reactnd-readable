import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import Post from './Post'
import Comments from '../comments/Comments'
import NewComment from '../comments/NewComment'
import { Divider, Header, Icon } from 'semantic-ui-react'
import { handleAddComment, handleReceiveComments } from '../../store/actions/comments'
import { generateUID } from '../../api/api'

class PostDetails extends Component {

  state = {
    comments: []
  }

  async componentDidMount() {
    const { dispatch, post } = this.props

    await dispatch(handleReceiveComments(post.id))
  }

  handleAddComment = (author, body) => {

    const { dispatch, id } = this.props

    const newComment = this.getNewComment(id, author, body)

    this.setState((state) => ({
      comments: _.orderBy(state.comments.concat([newComment]), 'timestamp', 'desc')
    }))

    dispatch(handleAddComment(newComment))

  }

  getNewComment = (parentId, author, body) => {
    return {
      id: generateUID(),
      timestamp: new Date().getTime(),
      body,
      author,
      parentId
    }
  }

  render() {

    const { id } = this.props
    const { comments } = this.state

    return (
      <div>
        <Post id={id} />

        <Divider horizontal>
          <Header as='h4'>
            <Icon name='comment alternate outline' />
            Add a comment
          </Header>
        </Divider>

        <NewComment handleAddComment={this.handleAddComment} />

        <Divider horizontal>
          <Header as='h4'>
            <Icon name='comments outline' />
            Comments
          </Header>
        </Divider>

        <Comments />
      </div>
    )
  }
}

function matStateToProps({ posts }, props) {
  const { id } = props.match.params

  return {
    post: _.find(posts, {id}),
    id
  }
}

export default connect(matStateToProps)(PostDetails)
