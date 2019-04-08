import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'
import Post from './Post'

class PostPage extends Component {

  render() {

    const { postsIds } = this.props

    return (
      <Container>
        { postsIds && postsIds.map(id => (
            <Post key={id} id={id} />
          ))
        }
      </Container>
    )
  }
}

function mapStateToProps({ posts }) {

  return {
    postsIds: Object.values(posts).map(p => p.id)
  }

}

export default connect(mapStateToProps)(PostPage)
