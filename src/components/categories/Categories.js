import React from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu, Segment, Dropdown } from 'semantic-ui-react'
import { handlePostsByCategory } from '../../store/actions/postsActions'
import { sortBy } from '../../store/actions/sortByActions'
import { bindActionCreators } from 'redux'

const Categories = function({
  categories,
  sortByProp,
  activeCategory,
  handlePostsByCategory,
  sortBy
  }) {

  const options = [
    { key: 1, text: 'Date', value: 'timestamp' },
    { key: 2, text: 'Votescore', value: 'voteScore' }
  ]

  const handleItemClick = (e, { name }) => {
    handlePostsByCategory(name)
  }

  const handleOrder = (e, { value }) => {
    e.preventDefault()
    sortBy(value)
  }

  const option = _.find(options, {value: sortByProp})

  console.log(option)

  return (
    <Segment style={{margin: 0}}>
      <Menu pointing secondary>
        <Menu.Item
          name='all'
          active={activeCategory === 'all'}
          onClick={handleItemClick}
          as={Link}
          to="/"
        />
        { categories && categories.length > 0 && categories.map((category, idx) => (
            <Menu.Item
              key={idx}
              name={category.name}
              content={category.name}
              active={activeCategory === category.name}
              onClick={handleItemClick}
              as={Link}
              to={`/${category.path}`}
            />
          ))
        }
        <Menu.Menu position='right'>
          <Dropdown text={`Sort by: ${option ? option.text : ''}`}>
            <Dropdown.Menu>
              <Dropdown.Item
                text='Date'
                value='timestamp'
                onClick={handleOrder}
              />
              <Dropdown.Item
                text='Votescore'
                value='voteScore'
                onClick={handleOrder}
              />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
    </Segment>
  )
}

function mapStateToProps({ categories, sortBy, category }) {
  return {
    categories: Object.values(categories),
    sortByProp: sortBy,
    activeCategory: category
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ handlePostsByCategory, sortBy}, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories)
