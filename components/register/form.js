import { forEach } from 'lodash'
import { Component } from 'react'
import { observer, inject } from 'mobx-react'

import serialize from 'utils/form-serialize'

import Password from 'components/inputs/password'
import Username from 'components/inputs/username'
import Email from 'components/inputs/email'

@inject('userStore') @observer
class RegisterForm extends Component {
  constructor (props) {
    super(props)

    this.store = props.userStore
  }

  render () {
    const errors = {}
    const errorMsgs = {
      username: `Ce nom d'utilisateur est déjà utilisé`,
      email: 'Cet email est déjà utilisé',
      password: 'Ce mot de passe est trop court'
    }

    forEach(errorMsgs, (msg, field) => {
      if (this.store.hasRegisterError(field)) errors[field] = msg
    })

    return (
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
        <style jsx>{`
          .control.actions {
            text-align: center;
          }
        `}</style>
      </form>
    )
  }

  submit = (e) => {
    e.preventDefault()

    const data = serialize(e.currentTarget)

    this.store.register(data)
  }
}

export default RegisterForm
