import { Component } from 'react'
import { inject, observer } from 'mobx-react'

import Password from 'components/inputs/password'
import Username from 'components/inputs/username'
import Email from 'components/inputs/email'

@inject('userStore') @observer
class UserForm extends Component {
  constructor (props) {
    super(props)
    this.userStore = props.userStore
  }

  render () {
    const user = this.userStore.user

    return (
      <form>
        <div className='columns'>
          <div className='column is-one-third-desktop is-offset-4-desktop is-half-tablet is-offset-3-tablet'>
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
}

export default UserForm
