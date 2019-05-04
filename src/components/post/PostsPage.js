import React, { Fragment } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import Post from './Post'
import NothingHere from '../NothingHere'

const PostPage = function ({ posts }) {

    return (
      <Fragment>
        { posts
          && posts.length > 0
          ? posts.map((post, idx) => (
            <Post key={idx} post={post} />
          ))
          : <NothingHere />
        }
      </Fragment>
    )
}

function mapStateToProps({ posts, sortBy, category }) {

  if (posts && posts.length > 0 && category !== null && category !== 'all') {
    posts = posts.filter(post => post.category === category)
  }

  posts = _.orderBy(posts, `${sortBy}`, 'desc')

  return {
    posts
  }

}

export default connect(mapStateToProps)(PostPage)
