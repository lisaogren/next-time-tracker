import { Component } from 'react'
import { inject, observer } from 'mobx-react'

import serialize from 'utils/form-serialize'

import Password from 'components/inputs/password'
import Username from 'components/inputs/username'
import Email from 'components/inputs/email'
import Icon from 'components/icon'

@inject('userStore') @observer
class UserForm extends Component {
  constructor (props) {
    super(props)
    this.userStore = props.userStore
  }

  render () {
    const user = this.userStore.user
    const updated = this.userStore.profileUpdated
    let notif = null

    if (updated) {
      notif = (
        <div className='notification is-info'>
          <span className='icon-container'>
            <Icon name='check' fontSize='2rem' />
          </span>
          <span>Ton profil a bien été mis à jour</span>
          <style jsx>{`
            .notification {
              display: flex;
              align-items: center;

              .icon-container {
                margin-left: .5rem;
                margin-right: 1rem;
              }
            }
          `}</style>
        </div>
      )

      setTimeout(() => this.userStore.resetProfileUpdated(), 3000)
    }

    return (
      <form onSubmit={this.submit}>
        <div className='columns'>
          <div className='column is-one-third-desktop is-offset-4-desktop is-half-tablet is-offset-3-tablet'>
            {notif}
            <Username value={user.username} />
            <Email value={user.email} />
            <Password />
            <div className='field'>
              <div className='control actions'>
                <button className='button is-primary'>Sauvegarder</button>
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

  submit = e => {
    e.preventDefault()

    const { username, email, password } = serialize(e.currentTarget)

    const data = { username, email }
    if (password) data.password = password

    this.userStore.updateMe(data)
  }
}

export default UserForm
