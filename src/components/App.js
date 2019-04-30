import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import { Container, Grid } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { handleInitialData } from '../store/actions/shared'
import PostsPage from './post/PostsPage'

import Nav from './header/Nav'
import NewPost from './post/NewPost'
import PostDetails from './post/PostDetails'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Switch>
        <Router>
          <Fragment>

            <LoadingBar />
            <Nav />

            <Container style={{marginTop: '14em'}} textAlign='center'>
              <Grid centered columns={2}>
                <Grid.Column>
                  <Route path='/' exact component={PostsPage} />
                  <Route path='/category/:category' component={PostsPage} />
                  <Route path='/post/:id' component={PostDetails} />
                  <Route path='/edit/:id' component={NewPost} />
                  <Route path='/new' component={NewPost} />
                </Grid.Column>
              </Grid>
            </Container>

          </Fragment>
        </Router>
      </Switch>
    )
  }
}

export default connect()(App)
