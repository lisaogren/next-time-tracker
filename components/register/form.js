import { Component } from 'react'
import { observer, inject } from 'mobx-react'

import Icon from 'components/icon'
import Password from 'components/inputs/password'
import Username from 'components/inputs/username'
import Email from 'components/inputs/email'

import serialize from 'utils/form-serialize'

@inject('userStore') @observer
class RegisterForm extends Component {
  constructor (props) {
    super(props)

    this.store = props.userStore
  }

  render () {
    const errors = {}

    if (this.store.hasError('username')) errors.username = `Ce nom d'utilisateur est déjà utilisé`
    if (this.store.hasError('email')) errors.email = 'Cet email est déjà utilisé'
    if (this.store.hasError('password')) errors.password = 'Ce mot de passe est trop court'

    return (
      <div className='container'>
        <h1 className='title has-text-centered'>Créer ton compte !</h1>
        <hr />
        <form className='register' onSubmit={this.submit}>
          <div className='columns'>
            <div className='column is-one-third-desktop is-offset-4-desktop is-half-tablet is-offset-3-tablet'>
              <Username error={errors.username} />
              <Email error={errors.email} />
              <Password error={errors.password} />
              <div className='field'>
                <div className='control actions'>
                  <button className='button is-primary'>S'inscrire</button>
                </div>
              </div>
            </div>
          </div>
        </form>
        <hr />
        <div className='content has-text-centered'>
          <h3>Tu as déjà un compte ?!</h3>
          <p>
            Mais quesque tu fais là !
            <a href='/login' className='login-link'>
              <Icon name='sign-in' />
              <span>Connectes-toi</span>
            </a>
          </p>
        </div>
      </div>
    )
  }

  submit = (e) => {
    e.preventDefault()

    const data = serialize(e.currentTarget)

    this.store.register(data)
  }
}

export default RegisterForm
