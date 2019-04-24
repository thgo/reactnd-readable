import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import { Container, Grid } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { handleInitialData } from '../store/actions/shared'
import PostsPage from './post/PostsPage'

import Nav from './header/Nav'
import PostEdit from './post/PostEdit';
import NewPost from './post/NewPost';

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <Fragment>

          <LoadingBar />
          <Nav />

          <Container style={{marginTop: '14em'}} textAlign='center'>
            <Grid centered columns={2}>
              <Grid.Column>
                <Route path='/' exact component={PostsPage} />
                <Route path='/posts/:category' component={PostsPage} />
                <Route path='/edit/post/:id' component={PostEdit} />
                <Route path='/new' component={NewPost} />
              </Grid.Column>
            </Grid>
          </Container>

        </Fragment>
      </Router>
    )
  }
}

export default connect()(App)
