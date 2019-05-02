import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Post from './Post'
import Comments from '../comments/Comments'
import NewComment from '../comments/NewComment'
import { Divider, Header, Icon } from 'semantic-ui-react'
import { handleAddComment, handleReceiveComments } from '../../store/actions/comments'

class PostDetails extends Component {

  async componentDidMount() {
    const { dispatch } = this.props
    const { id } = this.props.match.params

    await dispatch(handleReceiveComments(id))
  }

  handleAddComment = (author, body) => {

    const { dispatch } = this.props
    const { id } = this.props.match.params

    dispatch(handleAddComment({
      body,
      author,
      parentId: id
    }))
  }

  render() {

    const { id } = this.props.match.params

    if (!id) {
      return <Redirect to='/notfound' />
    }

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

export default connect()(PostDetails)
