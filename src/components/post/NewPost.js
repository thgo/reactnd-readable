import React, { Component } from "react"
import { connect } from 'react-redux'
import { Card, Grid, Button, Icon, Form } from "semantic-ui-react"
import { handleAddNewPost } from "../../store/actions/posts";
import { Redirect } from 'react-router-dom'

class NewPost extends Component {

  state = {
    title: '',
    body: '',
    author: '',
    category: null,
    toHome: false
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleSubmit = () => {
    const { title, body, author, category } = this.state
    const { dispatch } = this.props

    dispatch(handleAddNewPost(title, body, author, category))

    this.setState({toHome : true})
  }

  render() {

    const { title, body, author, toHome} = this.state
    const { categories } = this.props

    if (toHome === true) {
      return <Redirect to='/' />
    }

    const categoriesOpn = categories && categories.length > 0
      ? categories.map((cat, idx) => {
          return {
            ...cat,
            key: idx,
            text: cat.name,
            value: cat.name
          }
        })
      : []

    return (
      <Card fluid>
        <Card.Content>
          <Card.Header style={{fontWeight: 'bold', fontSize: '1.3em'}}>Create a new Post</Card.Header>
          <Card.Description>
            <Form onSubmit={this.handleSubmit}>
              <Form.Input
                label='Title'
                placeholder='Title'
                name='title'
                value={title}
                onChange={this.handleChange}
              />
              <Form.TextArea
                label='Message'
                placeholder='Message'
                name='body'
                value={body}
                onChange={this.handleChange}
              />
              <Form.Input
                label='Author'
                placeholder='Author'
                name='author'
                value={author}
                onChange={this.handleChange}
              />
              <Form.Select
                label='Category'
                placeholder='Select'
                options={categoriesOpn}
                name='category'
                onChange={this.handleChange}
              />
              <Grid columns='equal'>
                <Grid.Row>
                  <Grid.Column>
                    <Button type='submit' basic color='green' fluid name='save'>
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

function mapStateToProps ({ categories }) {

  return {
    categories
  }
}

export default connect(mapStateToProps)(NewPost)