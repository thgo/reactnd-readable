import React, { Component } from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu, Segment, Dropdown } from 'semantic-ui-react'
import { handlePostsByCategory, getAllPosts } from '../../store/actions/posts'
import { sortBy } from '../../store/actions/sortBy'
import { toggleCategory } from '../../store/actions/category';

class Categories extends Component {

  state = {
    activeItem: 'all'
  }

  options = [
    { key: 1, text: 'Date', value: 'timestamp' },
    { key: 2, text: 'Votescore', value: 'voteScore' }
  ]

  componentDidMount() {

    const { category } = this.props

    console.log('DID MOUNT: ', category)

    if (typeof category == String)
      this.setState({ activeItem: category })

  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name, category: name })

    const { dispatch } = this.props

    dispatch(toggleCategory(name))

    if (name !== 'all') {
      dispatch(handlePostsByCategory(name))
    } else {
      dispatch(getAllPosts())
    }
  }

  handleOrder = (e, { value }) => {
    e.preventDefault()
    const { dispatch } = this.props

    dispatch(sortBy(value))
  }

  render() {
    const { activeItem } = this.state
    const { categories, sortBy } = this.props
    const option = _.find(this.options, {value: sortBy})

    return (
      <Segment style={{margin: 0}}>
        <Menu pointing secondary>
          <Menu.Item
            name='all'
            active={activeItem === 'all'}
            onClick={this.handleItemClick}
            as={Link}
            to="/"
          />
          { categories && categories.length > 0 && categories.map((category, idx) => (
              <Menu.Item
                key={idx}
                name={category.name}
                content={category.name}
                active={activeItem === category.name}
                onClick={this.handleItemClick}
                as={Link}
                to={`/posts/${category.path}`}
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
    category
  }
}

export default connect(mapStateToProps)(Categories)
