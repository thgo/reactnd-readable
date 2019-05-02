import React, { Component } from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu, Segment, Dropdown } from 'semantic-ui-react'
import { handlePostsByCategory } from '../../store/actions/posts'
import { sortBy } from '../../store/actions/sortBy'

class Categories extends Component {

  options = [
    { key: 1, text: 'Date', value: 'timestamp' },
    { key: 2, text: 'Votescore', value: 'voteScore' }
  ]

  handleItemClick = (e, { name }) => {

    const { dispatch } = this.props

    dispatch(handlePostsByCategory(name))
  }

  handleOrder = (e, { value }) => {
    e.preventDefault()
    const { dispatch } = this.props

    dispatch(sortBy(value))
  }

  render() {
    const { categories, sortBy, activeCategory } = this.props
    const option = _.find(this.options, {value: sortBy})

    return (
      <Segment style={{margin: 0}}>
        <Menu pointing secondary>
          <Menu.Item
            name='all'
            active={activeCategory === 'all'}
            onClick={this.handleItemClick}
            as={Link}
            to="/"
          />
          { categories && categories.length > 0 && categories.map((category, idx) => (
              <Menu.Item
                key={idx}
                name={category.name}
                content={category.name}
                active={activeCategory === category.name}
                onClick={this.handleItemClick}
                as={Link}
                to={`/category/${category.path}`}
              />
            ))
          }
          <Menu.Menu position='right'>
            <Dropdown text={`Sort by: ${option ? option.text : ''}`}>
              <Dropdown.Menu>
                <Dropdown.Item
                  text='Date'
                  value='timestamp'
                  onClick={this.handleOrder}
                />
                <Dropdown.Item
                  text='Votescore'
                  value='voteScore'
                  onClick={this.handleOrder}
                />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Menu>
      </Segment>
    )
  }
}

function mapStateToProps ({ categories, sortBy, category }) {

  return {
    categories: Object.values(categories),
    sortBy,
    activeCategory: category
  }

}

export default connect(mapStateToProps)(Categories)
