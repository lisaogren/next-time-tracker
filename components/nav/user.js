import { Component } from 'react'
import { inject, observer } from 'mobx-react'

import NavItem from './item'

@inject('userStore') @observer
class UserNav extends Component {
  render () {
    const { loggedIn, user } = this.props.userStore

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

          <div className='navbar-dropdown is-right'>
            <NavItem label='Paramètres' icon='cog' href='/settings' />
            <hr className='navbar-divider' />
            <NavItem label='Déconnexion' icon='sign-out' onClick={this.logout} />
          </div>
          <style jsx>{`
            .field.is-grouped {
              align-items: center;

              span {
                margin-left: .5rem;
              }
            }
          `}</style>
        </div>
      )
    }

    return (
      <NavItem label='Connexion' icon='sign-in' href='/login' />
    )
  }

  logout = (e) => {
    this.props.userStore.logout()
  }
}

export default UserNav
