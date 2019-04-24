import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Grid } from 'semantic-ui-react'
import Categories from '../categories/Categories';

export default function Header () {
  return (
    <Container fluid style={{position: 'fixed', zIndex: '999'}}>
      <div style={{height: '170px', borderRadius: '0', backgroundColor: '#6335BF', boxShadow: '0 10px 10px rgb(99, 53, 191)'}}>
        <Grid style={{padding: '20px'}} verticalAlign={"middle"}>
          <Grid.Column width={2}>
            <h1 style={{color: 'wheat'}}>Readable</h1>
          </Grid.Column>
          <Grid.Column>
            <Link to='/'><h4 style={{color: '#FFF'}}>Home</h4></Link>
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
