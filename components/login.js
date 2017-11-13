import { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Link from 'next/link'

import serialize from 'utils/form-serialize'

import userStore from 'stores/user'

import Icon from './icon'
import Password from './inputs/password'

// ----------------------
// Sub-components
// ----------------------

const SubmitButton = (props) => {
  // const isConnecting = state.user.login.connecting

  // if (isConnecting) {
  //   return html`<button class="button is-primary" disalbed="true">Connexion en cours ...</button>`
  // }

  return (
    <button className='button is-primary'>Se connecter</button>
  )
}

function LoginError () {
  // if (state.user.login.error) {
  //   const message = state.user.login.error === 'functional'
  //     ? html`<span>Connexion impossible...<br>T'as dû te tromper d'identiant</span>`
  //     : technicalError()

  //   return html`
  //     <div class="notification is-warning login-error">
  //       ${message}
  //     </div>
  //   `
  // }

  return null
}

@observer
class Login extends Component {
  render () {
    return (
      <section className='section login-component'>
        <div className='container'>
          <h1 className='title has-text-centered'>Connecte-toi à ton compte !</h1>
          <hr />
          <form className='login' onSubmit={this.submit}>
            <div className='columns'>
              <div className='column is-one-third-desktop is-offset-4-desktop is-half-tablet is-offset-3-tablet'>
                <LoginError />
                <div className='field'>
                  <label className='label'>Nom d'utilisateur ou e-mail</label>
                  <div className='control'>
                    <input type='text' name='identifier' className='input' placeholder='jeanmichel@peupres.fr' required />
                  </div>
                </div>
                <Password />
                <div className='field'>
                  <div className='control actions'>
                    <SubmitButton />
                  </div>
                </div>
              </div>
            </div>
          </form>
          <hr />
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
          </div>
        </div>
        <style jsx>{`
          form.login .control.actions {
            text-align: center;
          }

          form.login .login-error {
            padding: 0.5rem;
          }

          .register-link {
            display: inline-flex;
            align-items: center;
            margin-left: .5rem;

            span {
              margin-right: .5rem;
            }
          }
        `}</style>
      </section>
    )
  }

  submit = (e) => {
    e.preventDefault()

    const data = serialize(e.currentTarget)

    userStore.login(data)
  }
}

export default Login
