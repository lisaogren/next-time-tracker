import Link from 'next/link'

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
  //     ? html`<span>Connection impossible...<br>T'as dû te tromper d'identiant</span>`
  //     : technicalError()

  //   return html`
  //     <div class="notification is-warning login-error">
  //       ${message}
  //     </div>
  //   `
  // }

  return null
}

const Login = (props) => (
  <section className='section login-component'>
    <div className='container'>
      <h1 className='title has-text-centered'>Connecte-toi à ton compte !</h1>
      <hr />
      <form className='login'>
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
          <span>Pas de problème !&nbsp;</span>
          <Link href='/register'>
            <a className='register-link'>
              <span>Créer ton compte en quelques secondes</span>
              <Icon name='arrow-right' />
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

      .register-link .icon i {
        font-size: 1rem;
      }
    `}</style>
  </section>
)

export default Login
