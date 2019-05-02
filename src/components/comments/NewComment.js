import React, { Component } from 'react'
import { Form, Button, Segment } from 'semantic-ui-react'

class NewComment extends Component {

  state = {
    author: '',
    body: ''
  }

  handleChange = (e, {name, value}) => {
    e.preventDefault()

    this.setState({
      [name]: value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { handleAddComment } = this.props
    const { author, body } = this.state

    handleAddComment(author, body)
    this.clearStateFields()
  }

  clearStateFields = () => {
    this.setState({
      author: '',
      body: ''
    })
  }

  render() {

    const { author, body } = this.state

    return (
      <Segment raised>
        <Form autoComplete='off' onSubmit={this.handleSubmit}>
          <Form.Input
            label='Author *'
            placeholder='Author'
            name='author'
            value={author}
            onChange={this.handleChange}
          />
          <Form.TextArea
            label='Message *'
            placeholder='Message'
            name='body'
            value={body}
            onChange={this.handleChange}
          />
          <Button content='Add Comment' labelPosition='left' icon='edit' primary disabled={author === '' || body === ''} />
        </Form>
      </Segment>
    )
  }

}

export default NewComment