import React from 'react'

import FontAwesome from 'react-fontawesome'

export default (props) => {
  const size = props.size ? `is-${props.size}` : ''
  return (
    <span className={`icon ${size}`}>
      <FontAwesome name={props.name} />
    </span>
  )
}
