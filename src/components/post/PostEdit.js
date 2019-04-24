import React, { Component, Fragment } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import Post from './Post'

class PostEdit extends Component {
  render() {

    const { post } = this.props

    return (
      <Fragment>
        { post && <Post id={post.id} /> }
      </Fragment>
    )
  }
}

function mapStateToProps({ posts }, props) {
  const { id } = props.match.params
  const post = _.find(posts, { id })
  return {
    post,
  }
}

export default connect(mapStateToProps)(PostEdit)
