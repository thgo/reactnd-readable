import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Post from './Post'
import Comments from '../comments/Comments'
import NewComment from '../comments/NewComment'
import { Divider, Header, Icon } from 'semantic-ui-react'
import { handleAddComment, handleReceiveComments } from '../../store/actions/commentsActions'
import { bindActionCreators } from 'redux';

class PostDetails extends Component {

  componentDidMount() {
    const { handleReceiveComments } = this.props
    const { id } = this.props.match.params
    handleReceiveComments(id)
  }

  handleAddComment = (author, body) => {

    const { handleAddComment } = this.props
    const { id } = this.props.match.params

    handleAddComment({
      body,
      author,
      parentId: id
    })
  }

  render() {

    const { post } = this.props

    if (!post) {
      return <Redirect to='/notfound' />
    }

    return (
      <div>
        <Post post={post} />

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

function mapStateToProps({ posts }, props) {
  const { id } = props.match.params
  const post = posts.filter(post => post.id === id)[0]

  return {
    post
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    handleReceiveComments,
    handleAddComment
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails)
