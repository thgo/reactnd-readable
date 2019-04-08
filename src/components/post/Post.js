import React, { Component } from 'react'
import { connect } from 'react-redux'

class Post extends Component {

  render() {

    const { post } = this.props

    return (
      <div>
        CHUPA CARAI {post[0].title}
      </div>
    )
  }
}

function mapStateToProps({ posts }, {id}) {

  console.log('POSTS', posts)
  const post = Object.values(posts).filter(f => f.id === id)
  console.log('POST', post)

  return {
    ...post
  }

}

export default connect(mapStateToProps)(Post)