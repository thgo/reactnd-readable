import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import { handleInitialData } from '../actions/shared'
import PostsPage from './post/PostsPage'
import { Container, Grid } from 'semantic-ui-react'
import Categories from './categories/Categories'
import Nav from './header/Nav'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Fragment>
        <LoadingBar />
        <Nav />
        <Container style={{ marginTop: '7em' }}>
          <Grid centered columns={1}>
            <Grid.Column textAlign='center'>
              <Categories />
            </Grid.Column>
          </Grid>
          <Grid centered columns={2}>
            <Grid.Column textAlign='center'>
              <PostsPage />
            </Grid.Column>
          </Grid>
        </Container>

      </Fragment>

    )
  }
}

export default connect()(App)
