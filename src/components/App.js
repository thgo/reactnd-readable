import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Container, Grid } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { handleInitialData } from '../store/actions/sharedActions'
import PostsPage from './post/PostsPage'

import Nav from './header/Nav'
import NewPost from './post/NewPost'
import PostDetails from './post/PostDetails'
import Notfound from './Notfound'

class App extends Component {

  async componentDidMount() {
    const { dispatch } = this.props
    await dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <Fragment>

          <Nav />

          <Container style={{marginTop: '14em'}} textAlign='center'>
            <Grid centered columns={2}>
              <Grid.Column>
                <Switch>
                  <Route path='/' exact component={PostsPage} />
                  <Route path='/category/:category' component={PostsPage} />
                  <Route path='/post/:id' component={PostDetails} />
                  <Route path='/edit/:id' component={NewPost} />
                  <Route path='/new' component={NewPost} />
                  <Route component={Notfound} />
                </Switch>
              </Grid.Column>
            </Grid>
          </Container>

        </Fragment>
      </Router>
    )
  }
}

export default connect()(App)
