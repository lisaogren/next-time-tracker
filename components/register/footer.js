import Link from 'next/link'

import Icon from 'components/icon'

export default (props) => {
  return (
    <div className='content has-text-centered'>
      <h3>Tu as déjà un compte ?!</h3>
      <p>
        Mais que fais-tu là ?!
        <Link href='/login'>
          <a className='login-link'>
            <span>Connecte-toi</span>
            <Icon name='sign-in' fontSize='1rem' />
          </a>
        </Link>
      </p>
      <style jsx>{`
        .login-link {
          display: inline-flex;
          align-items: center;
          margin-left: .5rem;

          span {
            margin-right: .5rem;
          }
        }
      `}</style>
    </div>
  )
}
