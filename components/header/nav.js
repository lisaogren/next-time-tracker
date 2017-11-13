import { Component } from 'react'
import { observer, inject } from 'mobx-react'

import NavItem from './nav-item'

@inject('userStore') @observer
class Nav extends Component {
  constructor (props) {
    super(props)
    this.store = props.userStore
  }

  componentWillMount () {
    this.store.me()
  }

  render () {
    return (
      <div id='time-tracker-nav' className='navbar-menu'>
        {this.mainNav()}
        <div className='navbar-end'>
          {this.userNav()}
        </div>
      </div>
    )
  }

  mainNav () {
    return (
      <div className='navbar-start'>
        <NavItem label='Résumé' icon='area-chart' href='/' />
        <NavItem label='Détails' icon='table' href='/details' />
      </div>
    )
  }

  userNav () {
    const { loggedIn, user } = this.store

    if (loggedIn && user) {
      return (
        <div className='navbar-item has-dropdown is-hoverable user-nav'>
          <a href='/profile' className='navbar-link'>
            <div className='field is-grouped'>
              <figure className='image is-16x16'>
                <img src={user.gravatarUrl} alt='' title='' />
              </figure>
              <span>{user.username}</span>
            </div>
          </a>

          <div className='navbar-dropdown'>
            <NavItem label='Paramètres' icon='cog' href='/settings' />
            <hr className='navbar-divider' />
            <NavItem label='Déconnexion' icon='sign-out' onClick={this.logout} />
          </div>
        </div>
      )
    }

    return (
      <NavItem label='Connexion' icon='sign-in' href='/login' />
    )
  }

  logout = (e) => {
    this.store.logout()
  }
}

export default Nav
