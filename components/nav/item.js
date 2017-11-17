import Link from 'next/link'
import { withRouter } from 'next/router'
import { Component } from 'react'
import classnames from 'classnames'

import Icon from 'components/icon'

@withRouter
class NavItem extends Component {
  constructor ({ router, href }) {
    super()

    this.state = {
      isActive: router.pathname === href
    }
  }

  render () {
    const { href = '', onClick = null } = this.props

    if (onClick) return this.content()

    return (
      <Link href={href}>{this.content()}</Link>
    )
  }

  content () {
    const { label = '', onClick = null, icon } = this.props
    const classes = classnames('navbar-item', {
      'is-active': this.state.isActive
    })

    return (
      <a className={classes} onClick={onClick}>
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
