import React from 'react'
import { Segment, Header, Icon, Card, CardDescription, CardContent, Button } from 'semantic-ui-react';

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
        <Button primary >Create new</Button>
      </Card.Content>
    </Card>

  )
}