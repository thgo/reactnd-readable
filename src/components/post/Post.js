import React, { Component } from "react"
import _ from 'lodash'
import { connect } from "react-redux"
import { Link, Redirect } from 'react-router-dom'
import Moment from 'react-moment'
import { Card, Icon, Grid, Statistic, Button, Dropdown } from "semantic-ui-react"
import { handleVotePost, handleDeletePost, handleReceivePostDetails, handlePostsByCategory } from '../../store/actions/posts'
import { formatDate } from "../../utils/utils"
import { toggleCategory } from "../../store/actions/category"

class Post extends Component {

  state = {
    redirectTo: null
  }

  handleLike = (e, { name }) => {
    e.preventDefault()
    const { dispatch, post } = this.props
    dispatch(handleVotePost(post, name))
  }

  handleDeletePost = (e) => {
    e.preventDefault()

    const { dispatch, post, category } = this.props

    console.log('category: ', category)
    console.log('POST category: ', post.category)

    if (category !== post.category) {
      this.setState({ redirectTo: `/category/${category}` })
      dispatch(handlePostsByCategory(category))
    }

    dispatch(handleDeletePost(post.id))
  }

  handleGetPostDetails = (e) => {

    const { dispatch, post } = this.props

    dispatch(toggleCategory(post.category))
    dispatch(handleReceivePostDetails(post.id))
  }

  render() {
    const { post } = this.props
    const { redirectTo } = this.state

    if (redirectTo !== null) {
      return <Redirect to={redirectTo} />
    }

    return (
      <Card fluid raised>
        <Card.Content>
          <Grid columns={2}>
            <Grid.Column width={13}>
              <Card.Header
                as={Link}
                to={`/post/${post.id}`}
                onClick={this.handleGetPostDetails}
                style={{fontWeight: 'bold', fontSize: '1.3em'}}
              > { post.title }
              </Card.Header>
              <Card.Meta style={{color: '#F0577C'}}>
                <Icon name='user outline' /> { post.author }
              </Card.Meta>
            </Grid.Column>
            <Grid.Column width={3} >
              <Statistic size='mini' floated='right' style={{margin: 0}}>
                <Statistic.Value>
                  <Icon name='star' size='small'/>
                  { post.voteScore }
                </Statistic.Value>
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
                <Icon name='clock outline' />
                <Moment
                  fromNow
                  date={new Date(post.timestamp)}
                  title={formatDate(post.timestamp)}
                />
              </Grid.Column>
              <Grid.Column>
                <Icon name='comment alternate outline' /> { post.commentCount } Comments
              </Grid.Column>
              <Grid.Column textAlign='right'>
                <Dropdown
                  icon="ellipsis vertical"
                  title='Options'
                  onClick={(e) => e.preventDefault()}
                >
                  <Dropdown.Menu>
                    <Dropdown.Item
                      icon='edit outline'
                      text='Edit'
                      title='Edit this post'
                      as={Link}
                      to={`/edit/${post.id}`}
                      style={{color: '#000'}}
                    />
                    <Dropdown.Item
                      icon='trash alternate outline'
                      text='Remove'
                      title='Delete this post'
                      onClick={this.handleDeletePost}
                    />
                  </Dropdown.Menu>
                </Dropdown>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Card.Content>
        <Card.Content extra>
          <Grid columns='equal'>
            <Grid.Row>
              <Grid.Column>
                <Button
                  basic
                  fluid
                  color='green'
                  name='upVote'
                  onClick={this.handleLike}
                >
                  <Icon name='thumbs up outline' /> Like
                </Button>
              </Grid.Column>
              <Grid.Column>
                <Button
                  basic
                  fluid
                  color='red'
                  name='downVote'
                  onClick={this.handleLike}
                >
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

function mapStateToProps({ posts, category }, { id }) {
  return {
    post: _.find(posts, { id }),
    id,
    category
  }
}

export default connect(mapStateToProps)(Post)
