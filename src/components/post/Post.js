import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Moment from 'react-moment'
import { Card, Icon, Grid, Statistic, Button } from 'semantic-ui-react'
import { handleVotePost, handleDeletePost, handleReceivePostDetails, handlePostsByCategory } from '../../store/actions/postsActions'
import { formatDate } from '../../utils/utils'
import { toggleCategory } from '../../store/actions/categoryActions'
import Options from '../commons/Options'

class Post extends Component {

  /**
   * Manipula e despacha o evento relacinado ao voto no post
   */
  handleLike = (e, { name }) => {
    e.preventDefault()
    const { dispatch, post } = this.props
    dispatch(handleVotePost(post, name))
  }

  /**
   * Efetiva a remoção do post e, em seguida, seleciona a categoria do post deletado,
   * caso a categoria anteriormente selecionada seja diferente de 'todos'
   */
  handleDeletePost = (e) => {
    e.preventDefault()

    const { dispatch, post, category } = this.props

    dispatch(handleDeletePost(post.id))

    if (category !== 'all') {
      dispatch(handlePostsByCategory(category))
      this.props.history.push(`/category/${category}`)
    }
  }

  /**
   * Altera a categoria na tela, conforme a categoria do post,
   * e busca os detalhes do mesmo.
   * Após, redireciona para o componente PostDetails.
   */
  handleGetPostDetails = () => {
    const { dispatch, post } = this.props
    dispatch(toggleCategory(post.category))
    dispatch(handleReceivePostDetails(post.id))
    this.props.history.push(`/post/${post.id}`)
  }

  render() {
    const { post } = this.props

    return (
      <Card fluid raised>
        <Card.Content>
          <Grid columns={2}>
            <Grid.Column width={13}>
              <Card.Header
                title='View post details'
                onClick={this.handleGetPostDetails}
                style={{fontWeight: 'bold', fontSize: '1.3em', cursor: 'pointer', color: '#4DC4FF'}}
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
                <Icon name='comment alternate outline' />
                { post.commentCount } Comments
              </Grid.Column>
              <Grid.Column textAlign='right'>
                <Options
                  redirect={`/edit/${post.id}`}
                  handleDelete={this.handleDeletePost}
                />
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

function mapStateToProps({ category }) {
  return {
    category
  }
}

export default withRouter(connect(mapStateToProps)(Post))
