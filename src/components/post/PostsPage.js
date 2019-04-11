import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Post from './Post'
import NothingHere from '../NothingHere'

class PostPage extends Component {

  render() {

    const { postsIds } = this.props

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
}

function mapStateToProps({ posts }) {

  return {
    postsIds: Object.values(posts).map(p => p.id)
  }

}

export default connect(mapStateToProps)(PostPage)
