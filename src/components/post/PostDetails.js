import React, { Component, Fragment } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Card } from 'semantic-ui-react';
import Post from './Post';
import Comments from '../comments/Comments'

class PostDetails extends Component {
  render() {

    const { post } = this.props


    return (
      <Fragment>
        <Post id={post.id} />
        <Comments />
      </Fragment>
    )
  }
}

function mapStateToProps({ posts }, props) {
  console.log('POSTDETAILS: ', posts)
  const { id } = props.match.params
  console.log('POSTDETAILS: ', id)
  const post = _.find(posts, { id })
  console.log('POSTDETAILS: ', post)
  return {
    post,
  }
}

export default connect(mapStateToProps)(PostDetails)
