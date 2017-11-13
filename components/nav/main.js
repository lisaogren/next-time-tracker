import { Component } from 'react'
import { inject, observer } from 'mobx-react'

import NavItem from './item'

@inject('userStore') @observer
class MainNav extends Component {
  render () {
    const { loggedIn } = this.props.userStore

    if (!loggedIn) return null

    return (
      <div className='navbar-start'>
        <NavItem label='Résumé' icon='area-chart' href='/' />
        <NavItem label='Détails' icon='table' href='/details' />
      </div>
    )
  }
}

export default MainNav
