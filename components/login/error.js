import { Component } from 'react'
import { inject, observer } from 'mobx-react'

import Icon from 'components/icon'

@inject('userStore') @observer
class LoginError extends Component {
  constructor (props) {
    super(props)
    this.store = props.userStore
  }

  render () {
    if (this.store.data.login.error) {
      const message = this.store.data.login.error === 'functional'
        ? this.functionalError()
        : this.technicalError()

      return (
        <div className='notification is-warning login-error'>
          <span>
            <span className='icon-container'>
              <Icon name='frown-o' fontSize='2rem' />
            </span>
            {message}
          </span>
          <style jsx>{`
            .login-error {
              padding: .5rem;

              > span {
                display: flex;
                align-items: center;

                .icon-container {
                  margin-left: .5rem;
                  margin-right: 1rem;
                }
              }
            }
          `}</style>
        </div>
      )
    }

    return null
  }

  functionalError () {
    return (
      <span>
        Connexion impossible...<br />T'as dû te tromper d'identiant
      </span>
    )
  }

  technicalError () {
    return (
      <span>
        Un problème technique est survenu...<br />
        Impossible de te connecter à ton compte Time Tracker pour le moment
      </span>
    )
  }
}

export default LoginError
