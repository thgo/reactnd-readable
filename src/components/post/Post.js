import React, { Component } from "react"
import { connect } from "react-redux"
import Moment from 'react-moment'
import { Card, Icon, Grid, Segment } from "semantic-ui-react"

class Post extends Component {
  render() {
    const { post } = this.props

    return (
      <Card fluid centered>
        <Card.Content>
          <Card.Header>{ post.title }</Card.Header>
          <Card.Meta>
            <Icon name='user outline' /> { post.author }
          </Card.Meta>
          <Card.Description>
            { post.body }
          </Card.Description>
        </Card.Content>
        <Card.Content extra >
          <Grid columns='equal'>
            <Grid.Row>
              <Grid.Column>
                <Segment>
                  <Icon name='clock outline' /> <Moment fromNow date={post.timestamp} />
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment>
                  <Icon name='comment alternate outline' /> { post.commentCount } Comments
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Card.Content>
      </Card>
    )
  }
}

function mapStateToProps({ posts }, { id }) {
  console.log("POSTS", posts)
  const post = posts.filter(post => post.id === id)[0]

  return {
    post
  }
}

export default connect(mapStateToProps)(Post)
