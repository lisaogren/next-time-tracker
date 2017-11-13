import { Component } from 'react'
import classnames from 'classnames'

import NavItem from 'components/nav/item'

class Brand extends Component {
  render () {
    const burgerClasses = classnames('navbar-burger', 'burger', {
      'is-active': this.props.opened
    })

    return (
      <div className='navbar-brand'>
        <NavItem label='Time Tracker' icon='clock-o' href='/' />
        <div className={burgerClasses} onClick={this.props.toggle}>
          <span />
          <span />
          <span />
        </div>
      </div>
    )
  }
}

export default Brand
