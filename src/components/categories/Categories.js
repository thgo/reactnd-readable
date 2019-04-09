import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu, Segment, Input, Dropdown } from 'semantic-ui-react'
import { handleSortPosts } from '../../actions/posts'

class Categories extends Component {

  state = {
    activeItem: 'all',
    orderBy: 'date'
  }

  options = [
    { key: 1, text: 'Date', value: 'date' },
    { key: 2, text: 'Points', value: 'points' }
  ]

  handleItemClick = (e, { name }) => {
    e.preventDefault()
    this.setState({ activeItem: name })
  }

  handleOrder = (e, name ) => {
    e.preventDefault()
    const { dispatch } = this.props
    this.setState({ orderBy: name })
    dispatch(handleSortPosts(name))
  }

  render() {
    const { activeItem, orderBy } = this.state
    const { categories } = this.props

    console.log('categories', this.props)

    return (
      <Segment style={{margin: 0}}>
        <Menu pointing secondary>
          <Menu.Item
            name='all'
            active={activeItem === 'all'}
            onClick={this.handleItemClick}
          />
          { categories && categories.map(c => (
              <Menu.Item key={c.name} name={c.name} active={activeItem === c.name} onClick={this.handleItemClick} />
            ))
          }
          <Menu.Menu position='right'>
            <Dropdown text={`Order by: ${orderBy}`}>
              <Dropdown.Menu>
                <Dropdown.Item
                  text='Date'
                  value='date'
                  onClick={(e) => this.handleOrder(e, 'date')}
                />
                <Dropdown.Item
                  text='Votes'
                  value='votes'
                  onClick={(e) => this.handleOrder(e, 'votes')}
                />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
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