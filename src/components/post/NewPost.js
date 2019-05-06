import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Card, Grid, Button, Icon, Form } from 'semantic-ui-react'
import { handleAddNewPost, handlePostsByCategory, handleEditPost } from '../../store/actions/postsActions'
import { Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux';

class NewPost extends Component {

  state = {
    title: '',
    body: '',
    author: '',
    category: null,
    redirectTo: '',
    edit: false
  }

  componentDidMount() {
    const { post, category } = this.props

    if (post) {
      this.setState({
        ...post,
        edit: true
      })
    } else {
      this.setState({
        category
      })
    }
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  /**
   * Submete o formulário com os dados do post,
   * caso seja uma edição, despacha a ação de atualizar o post,
   * caso seja um novo post, despacha a ação de criação de um novo post.
   *
   * Após submetido, encaminha o usuário à categoria do post.
   */
  handleSubmit = () => {

    const {
      title,
      body,
      author,
      category,
      edit
    } = this.state
    const {
      id,
      handleAddNewPost,
      handleEditPost,
      handlePostsByCategory
    } = this.props

    if (edit === false) {
      handleAddNewPost(title, body, author, category)
    } else {
      handleEditPost(id, title, body)
    }

    this.setState({redirectTo: `/${category}`})
    handlePostsByCategory(category)
  }

  render() {

    const {
      title,
      body,
      author,
      category,
      redirectTo,
      edit
    } = this.state

    const { id, categories } = this.props

    if (redirectTo !== '') {
      return <Redirect to={redirectTo} />
    }

    const categoriesOpn = categories && categories.length > 0
      ? categories.map((category, idx) => {
          return {
            key: idx,
            text: category.name,
            value: category.name
          }
        })
      : []

    const disableSubmit = !title || !body || !author || !category

    return (
      <Card fluid>
        <Card.Content>
          <Card.Header style={{fontWeight: 'bold', fontSize: '1.3em'}}>{!id ? 'Create new post' : 'Post edit'}</Card.Header>
          <Card.Description>
            <Form onSubmit={this.handleSubmit}>
              <Form.Input
                label='Title *'
                placeholder='Title'
                name='title'
                value={title}
                onChange={this.handleChange}
              />
              <Form.TextArea
                label='Message *'
                placeholder='Message'
                name='body'
                value={body}
                onChange={this.handleChange}
              />
              <Form.Input
                label='Author *'
                placeholder='Author'
                name='author'
                value={author}
                onChange={this.handleChange}
                disabled={edit}
              />
              <Form.Select
                label='Category *'
                placeholder='Select'
                options={categoriesOpn}
                value={category}
                name='category'
                onChange={this.handleChange}
                disabled={edit}
              />
              <Grid columns='equal'>
                <Grid.Row>
                  <Grid.Column>
                    <Button
                      basic
                      fluid
                      type='submit'
                      color='green'
                      name='save'
                      disabled={disableSubmit}
                    >
                      <Icon name='check' /> Save
                    </Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          </Card.Description>
        </Card.Content>
      </Card>
    )
  }
}

function mapStateToProps ({ categories, posts, category }, props) {

  const { id } = props.match.params

  return {
    categories,
    category,
    id,
    post: id !== null ? _.find(posts, {id}) : null
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    handleAddNewPost,
    handleEditPost,
    handlePostsByCategory
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPost)