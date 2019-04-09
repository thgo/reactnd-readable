import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Container } from 'semantic-ui-react'

export default function Header () {
  return (
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item header >
          My Reads
        </Menu.Item>
        <Menu.Item as={Link} content="Home" to="/" header />
        <Menu.Menu position='right'>
          <Menu.Item as={Link} content="Search" to="/search" header />
        </Menu.Menu>
      </Container>
    </Menu>
  )
}
