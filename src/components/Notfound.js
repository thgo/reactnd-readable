import React from 'react'
import { Segment, Header, Icon } from 'semantic-ui-react';

export default function Notfound() {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name='exclamation triangle' color='orange' />
        404. Not found.
      </Header>
    </Segment>
  )
}