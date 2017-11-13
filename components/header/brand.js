import { Component } from 'react'

import NavItem from './nav-item'

class Brand extends Component {
  render () {
    return (
      <div className='navbar-brand'>
        <NavItem label='Time Tracker' icon='clock-o' href='/' />
        <div className='navbar-burger burger' data-target='#time-tracker-nav'>
          <span />
          <span />
          <span />
        </div>
      </div>
    )
  }
}

export default Brand
