import { Component } from 'react'
import { inject, observer } from 'mobx-react'

import serialize from 'utils/form-serialize'

import Password from 'components/inputs/password'

import LoginError from './error'

@inject('userStore') @observer
class LoginForm extends Component {
  constructor (props) {
    super(props)
    this.store = props.userStore

    this.state = {
      identifier: ''
    }
  }

  render () {
    return (
      <form className='login' onSubmit={this.submit}>
        <div className='columns'>
          <div className='column is-one-third-desktop is-offset-4-desktop is-half-tablet is-offset-3-tablet'>
            <div className='field'>
              <label className='label'>Nom d'utilisateur ou e-mail</label>
              <div className='control'>
                <input type='text' name='identifier' className='input' placeholder='jeanmichel@peupres.fr' required value={this.state.identifier} onChange={this.onChange} />
              </div>
            </div>
            <Password onChange={this.resetLoginError} />
            <LoginError />
            <div className='field'>
              <div className='control actions'>
                <button className='button is-primary'>Se connecter</button>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          .control.actions {
            text-align: center;
          }
        `}</style>
      </form>
    )
  }

  onChange = e => {
    this.setState({ identifier: e.target.value })
    this.resetLoginError()
  }

  resetLoginError = () => {
    if (this.store.loginError) this.store.resetLoginError()
  }

  submit = e => {
    e.preventDefault()

    const data = serialize(e.currentTarget)

    this.store.login(data)
  }
}

export default LoginForm
