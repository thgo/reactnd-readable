import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Container, Dimmer, Loader } from 'semantic-ui-react'
import LoadingBar from 'react-redux-loading'
import { handleInitialData } from '../actions/shared'
import PostsPage from './post/PostsPage'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Fragment>
        <LoadingBar />
        <PostsPage />
      </Fragment>

    )
  }
}

export default connect()(App)
