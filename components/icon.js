import React from 'react'

import FontAwesome from 'react-fontawesome'

export default (props) => {
  const size = props.size ? `is-${props.size}` : ''
  return (
    <span className={`icon ${size} icon-component`}>
      <i className={`fa fa-${props.name}`} />
      <style jsx>{`
        .icon-component {
          width: auto;
          height: auto;

          i.fa {
            font-size: ${props.fontSize || 'auto'}
          }
        }
      `}</style>
    </span>
  )
}
