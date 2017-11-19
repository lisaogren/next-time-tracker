import { Component } from 'react'

import NavItem from 'components/nav/item'
import { Burger } from 'components/bulma'

class Brand extends Component {
  render () {
    return (
      <div className='navbar-brand'>
        <NavItem label='Time Tracker' icon='clock-o' href='/' />
        <NavItem label='Résumé' icon='area-chart' href='/dashboard' mobile />
        <NavItem label='Détails' icon='table' href='/details' mobile />
        <Burger active={this.props.opened} onClick={this.props.toggle} />
      </div>
    )
  }
}

export default Brand
