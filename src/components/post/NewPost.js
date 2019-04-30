import React, { Component } from "react"
import _ from 'lodash'
import { connect } from 'react-redux'
import { Card, Grid, Button, Icon, Form } from "semantic-ui-react"
import { handleAddNewPost, handlePostsByCategory, handleReceivePostDetails, handleEditPost } from "../../store/actions/posts";
import { Redirect } from 'react-router-dom'
import { toggleCategory } from "../../store/actions/category";

class NewPost extends Component {

  state = {
    title: '',
    body: '',
    author: '',
    category: null,
    redirectTo: '',
    edit: false
  }

  async componentDidMount() {
    const { id, dispatch, post, category } = this.props

    if (id) {
      await dispatch(handleReceivePostDetails(id))
      .then(() => this.setState({
        ...post,
        edit: true
      }))
    } else {
      this.setState({
        category
      })
    }
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleSubmit = () => {

    const { title, body, author, category, edit } = this.state
    const { id, dispatch } = this.props

    console.log('EDIT? ', edit)

    if (edit === false) {
      dispatch(handleAddNewPost(title, body, author, category))

    } else {
      dispatch(handleEditPost(id, title, body))
    }

    this.setState({redirectTo: `/category/${category}`})
    dispatch(handlePostsByCategory(category))
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
          <Card.Header style={{fontWeight: 'bold', fontSize: '1.3em'}}>{id === null ? 'Create new post' : 'Post edit'}</Card.Header>
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
                    <Button type='submit' basic color='green' fluid name='save' disabled={disableSubmit}>
                      <Icon name='thumbs up outline' /> Save
                    </Button>
                  </Grid.Column>
                  <Grid.Column>
                    <Button basic color='red' fluid name='cancel'>
                      <Icon name='thumbs down outline' /> Cancel
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
    id,
    category,
    post: id !== null ? _.find(posts, {id}) : null
  }
}

export default connect(mapStateToProps)(NewPost)