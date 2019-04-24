import React, { Fragment } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import Post from './Post'
import NothingHere from '../NothingHere'

const PostPage = function ({ postsIds }) {

    return (
      <Fragment>
        { postsIds.length === 0 && <NothingHere /> }
        { postsIds && postsIds.map(id => (
            <Post key={id} id={id} />
          ))
        }
      </Fragment>
    )
}

function mapStateToProps({ posts, sortBy, category }) {

  if (posts && posts.length > 0 && category !== null && category !== 'all') {
    posts = posts.filter(f => f.category === category)
  }

  console.log('POSTS FILTERED: ', posts)

  posts = _.sortBy(posts, `${sortBy}`)

  return {
    postsIds: Object.values(posts).map(p => p.id)
  }

}

export default connect(mapStateToProps)(PostPage)
