import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Container, Segment } from 'semantic-ui-react'
import Categories from '../categories/Categories';

export default function Header () {
  return (
    <Container fluid style={{position: 'fixed', zIndex: '999'}}>
      <Segment style={{height: '170px', borderRadius: '0', backgroundColor: '#6335BF'}}>
        <Link to='/'><h1>Readable</h1></Link>
        <Container style={{marginTop: '49px'}}>
          <Categories />
        </Container>
      </Segment>
    </Container>
  )
}
