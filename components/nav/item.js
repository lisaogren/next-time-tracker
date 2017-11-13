import Link from 'next/link'
import { Component } from 'react'

import Icon from 'components/icon'

class NavItem extends Component {
  render () {
    const { href = '', onClick = null } = this.props

    if (onClick) return this.content()

    return (
      <Link href={href}>{this.content()}</Link>
    )
  }

  content () {
    const { label = '', onClick = null, icon } = this.props

    return (
      <a className='navbar-item' onClick={onClick}>
        {icon ? <Icon name={icon} size='small' /> : ''}
        <span>{label}</span>
        <style jsx>{`
          span {
            margin-left: .5rem;
          }
        `}</style>
      </a>
    )
  }
}

export default NavItem
