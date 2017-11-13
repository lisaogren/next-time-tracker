import Link from 'next/link'
import { Component } from 'react'

import Icon from 'components/icon'

class LoginFooter extends Component {
  render () {
    return (
      <div className='content has-text-centered'>
        <h3>Pas de compte encore ?</h3>
        <p>
          <span>Pas de problème !</span>
          <Link href='/register'>
            <a className='register-link'>
              <span>Créer ton compte en quelques secondes</span>
              <Icon name='arrow-right' fontSize='1rem' />
            </a>
          </Link>
        </p>
        <style jsx>{`
          .register-link {
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
}

export default LoginFooter
