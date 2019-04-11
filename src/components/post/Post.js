import React, { Component } from "react"
import _ from 'lodash'
import { connect } from "react-redux"
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { Card, Icon, Grid, Statistic, Button } from "semantic-ui-react"
import { handleVotePost } from '../../actions/posts'

class Post extends Component {

  handleLike = (e, { name }) => {
    e.preventDefault()
    const { dispatch, post } = this.props
    dispatch(handleVotePost(post, name))
  }

  render() {
    const { post } = this.props

    return (
      <Card link fluid>
        <Card.Content>
          <Grid columns={2}>
            <Grid.Column width={13}>
              <Card.Header style={{fontWeight: 'bold', fontSize: '1.3em'}}>{ post.title }</Card.Header>
              <Card.Meta style={{color: '#F0577C'}}>
                <Icon name='user outline' /> { post.author }
              </Card.Meta>
            </Grid.Column>
            <Grid.Column width={3} >
              <Statistic size='mini' floated='right'>
                <Statistic.Value>
                  <Icon name='star' size='small'/>
                  {post.voteScore}
                </Statistic.Value>
                <Statistic.Label>Votes</Statistic.Label>
            </Statistic>
            </Grid.Column>
          </Grid>

          <Card.Description>
            { post.body }
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Grid columns='equal'>
            <Grid.Row>
              <Grid.Column>
                <Icon name='clock outline' /> <Moment fromNow date={post.timestamp} />
              </Grid.Column>
              <Grid.Column>
                <Icon name='comment alternate outline' /> { post.commentCount } Comments
              </Grid.Column>
              <Grid.Column textAlign='right'>
                <Link title='Edit this post' to={`/post/${post.id}`}>
                  <Icon name='edit'></Icon>
                </Link>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Card.Content>
        <Card.Content extra>
          <Grid columns='equal'>
            <Grid.Row>
              <Grid.Column>
                <Button basic color='green' fluid name='upVote' onClick={this.handleLike}>
                  <Icon name='thumbs up outline' /> Like
                </Button>
              </Grid.Column>
              <Grid.Column>
                <Button basic color='red' fluid name='downVote' onClick={this.handleLike}>
                  <Icon name='thumbs down outline' /> Dislike
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Card.Content>
      </Card>
    )
  }
}

function mapStateToProps({ posts }, { id }) {
  return {
    post: _.find(posts, { id })
  }
}

export default connect(mapStateToProps)(Post)
