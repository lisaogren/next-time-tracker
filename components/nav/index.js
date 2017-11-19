import { Component } from 'react'
import classnames from 'classnames'

import UserNav from './user'

class Nav extends Component {
  render () {
    const menuClasses = classnames('navbar-menu', {
      'is-active': this.props.opened
    })

    return (
      <div id='time-tracker-nav' className={menuClasses}>
        <div className='navbar-end'>
          <UserNav />
        </div>
      </div>
    )
  }
}

export default Nav
