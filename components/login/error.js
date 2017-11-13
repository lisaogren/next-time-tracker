import { Component } from 'react'
import { inject } from 'mobx-react'

@inject('userStore')
class LoginError extends Component {
  constructor (props) {
    super(props)
    this.store = props.userStore
  }

  render () {
    if (this.store.login.error) {
      const message = this.store.user.login.error === 'functional'
        ? (<span>Connexion impossible...<br />T'as dû te tromper d'identiant</span>)
        : this.technicalError()

      return (
        <div className='notification is-warning login-error'>
          <span>{message}</span>
          <style jsx>{`
            .login-error {
              padding: 0.5rem;
            }
          `}</style>
        </div>
      )
    }

    return null
  }

  technicalError () {
    return null
  }
}

export default LoginError
