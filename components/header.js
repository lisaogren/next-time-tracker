import Link from 'next/link'
import get from 'lodash/get'

import Icon from './icon'

const NavItem = (props) => {
  const { label = '', href = '', onClick = null, icon } = props

  const el = (
    <a className='navbar-item' onClick={onClick}>
      {icon ? <Icon name={icon} size='small' /> : ''}
      <span>{label}</span>
    </a>
  )

  if (!onClick) {
    return (
      <Link href={href}>{el}</Link>
    )
  }

  return el
}

const MainNav = () => (
  <div className='navbar-start'>
    <NavItem label='Résumé' icon='area-chart' href='/' />
    <NavItem label='Détails' icon='table' href='/details' />
  </div>
)

const UserNav = (props) => {
  const user = get(props, 'user.data')
  // const user = {
  //   username: 'RasCarlito',
  //   gravatarUrl: 'https://gravatar.com/avatar/7bf738f0bc687f938e04450a8a36aacc'
  // }

  if (user) {
    return (
      <a className='navbar-item has-dropdown is-hoverable user-nav'>
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
          {/* Pass onClick={logout} to NavItem ? */}
          <NavItem label='Déconnexion' icon='sign-out' onClick={logout} />
        </div>
      </a>
    )
  }

  return (
    <NavItem label='Connexion' icon='sign-in' href='/login' />
  )
}

const Header = () => (
  <nav className='navbar nav-component'>
    <div className='navbar-brand'>
      <NavItem label='Time Tracker' icon='clock-o' href='/' />
      <div className='navbar-burger burger' data-target='#time-tracker-nav'>
        <span />
        <span />
        <span />
      </div>
    </div>
    <div id='time-tracker-nav' className='navbar-menu'>
      <MainNav />
      <div className='navbar-end'>
        <UserNav />
      </div>
    </div>
  </nav>
)

export default Header

// -------------
// Listeners
// -------------

function logout (e) {
  e.preventDefault()

  window.alert('Logging out')
}
