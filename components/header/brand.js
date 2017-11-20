import { Component } from 'react'
import { inject, observer } from 'mobx-react'

import NavItem from 'components/nav/item'
import { Burger } from 'components/bulma'

@inject('userStore') @observer
class Brand extends Component {
  constructor (props) {
    super(props)

    this.userStore = props.userStore
  }

  render () {
    const { loggedIn } = this.userStore

    return (
      <div className='navbar-brand'>
        <NavItem label='Time Tracker' icon='clock-o' href='/' />
        {loggedIn ? <NavItem label='Résumé' icon='area-chart' href='/dashboard' mobile /> : ''}
        {loggedIn ? <NavItem label='Détails' icon='table' href='/details' mobile /> : ''}
        <Burger active={this.props.opened} onClick={this.props.toggle} />
      </div>
    )
  }
}

export default Brand
