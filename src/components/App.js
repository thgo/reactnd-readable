import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Grid } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { handleInitialData } from '../store/actions/sharedActions'
import PostsPage from './post/PostsPage'

import Nav from './header/Nav'
import NewPost from './post/NewPost'
import PostDetails from './post/PostDetails'
import Notfound from './commons/Notfound'

class App extends Component {

  async componentDidMount() {
    const { handleInitialData } = this.props
    await handleInitialData()
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
                  <Route path='/new' component={NewPost} />
                  <Route path='/notfound' component={Notfound} />
                  <Route path='/edit/:id' component={NewPost} />
                  <Route path='/:category/:id' component={PostDetails} />
                  <Route path='/:category' component={PostsPage} />
                </Switch>
              </Grid.Column>
            </Grid>
          </Container>

        </Fragment>
      </Router>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ handleInitialData }, dispatch)
}

export default connect(null, mapDispatchToProps)(App)
