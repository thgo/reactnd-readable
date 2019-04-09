import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Container, Segment } from 'semantic-ui-react'
import Categories from '../categories/Categories';

export default function Header () {
  return (
    <Container fluid>
      <Segment style={{height: '170px', borderRadius: '0', backgroundColor: '#6335BF'}}>
        Readable
        <Container style={{marginTop: '66px'}}>
          <Categories />
        </Container>
      </Segment>
    </Container>
  )
}
