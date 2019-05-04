import React from 'react'
import { Segment, Header, Icon, Card, CardContent, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default function NothingHere () {
  return (
    <Card fluid>
      <CardContent>
        <Segment placeholder>
          <Header icon>
            <Icon name='leaf' />
            Nothing here.
          </Header>
        </Segment>
      </CardContent>
      <Card.Content extra textAlign='center'>
        <Button primary as={Link} to='/new'>Create new</Button>
      </Card.Content>
    </Card>

  )
}