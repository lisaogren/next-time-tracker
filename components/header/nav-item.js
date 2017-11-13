import Link from 'next/link'
import Icon from 'components/icon'

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

export default NavItem
