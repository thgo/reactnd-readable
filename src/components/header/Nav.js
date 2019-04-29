import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Container, Grid } from 'semantic-ui-react'
import Categories from '../categories/Categories';
import { toggleCategory } from '../../store/actions/category';
import { connect } from 'react-redux'
import { getAllPosts } from './../../store/actions/posts';

class Header extends Component {

  handleToHome = () => {
    const { dispatch } = this.props
    dispatch(toggleCategory('all'))
    dispatch(getAllPosts())
  }

  render() {
    return (
      <Container fluid style={{position: 'fixed', zIndex: '999'}}>
        <div style={{height: '170px', borderRadius: '0', backgroundColor: '#6335BF', boxShadow: '0 10px 10px rgb(99, 53, 191)'}}>
          <Grid style={{padding: '20px'}} verticalAlign={"middle"}>
            <Grid.Column width={2}>
              <h1 style={{color: 'wheat'}}>Readable</h1>
            </Grid.Column>
            <Grid.Column>
              <Link to='/' onClick={this.handleToHome}><h4 style={{color: '#FFF'}}>Home</h4></Link>
            </Grid.Column>
            <Grid.Column>
              <Link to='/new'><h4 style={{color: '#FFF'}}>New Post</h4></Link>
            </Grid.Column>
          </Grid>
          <Container style={{marginTop: '10px'}}>
            <Categories />
          </Container>
        </div>
      </Container>
    )
  }
}

export default connect()(Header)
