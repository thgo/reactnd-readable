import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu, Segment } from 'semantic-ui-react'

class Categories extends Component {

  state = {
    activeItem: 'all'
  }

  handleItemClick = (e, { name }) => {
    e.preventDefault()
    this.setState({ activeItem: name })
  }

  render() {
    const { activeItem } = this.state
    const { categories } = this.props

    console.log('categories', this.props)

    return (
      <Segment style={{margin: 0}}>
        <Menu pointing secondary>
          <Menu.Item name='all' active={activeItem === 'all'} onClick={this.handleItemClick} />
          { categories && categories.map(c => (
              <Menu.Item key={c.name} name={c.name} active={activeItem === c.name} onClick={this.handleItemClick} />
            ))
          }
        </Menu>
      </Segment>
    )
  }
}

function mapStateToProps ({ categories }) {

  return {
    categories: Object.values(categories)
  }

}

export default connect(mapStateToProps)(Categories)