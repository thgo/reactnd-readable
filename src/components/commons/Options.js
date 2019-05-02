import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default function Options(props) {

  const { handleEdit, handleDelete } = props

  return (
    <Dropdown
      icon="ellipsis vertical"
      title='Options'
    >
      <Dropdown.Menu>
        <Dropdown.Item
          icon='edit outline'
          text='Edit'
          title='Edit'
          as={props.redirect ? Link : null}
          to={props.redirect ? props.redirect : null}
          onClick={handleEdit ? (e) => handleEdit(e) : null}
          style={{color: '#000'}}
        />
        <Dropdown.Item
          icon='trash alternate outline'
          text='Remove'
          title='Delete'
          onClick={(e) => handleDelete(e)}
        />
      </Dropdown.Menu>
    </Dropdown>
  )

}