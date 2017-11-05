import { Component } from 'react'
import { Provider, observer } from 'mobx-react'

import userStore from 'stores/user'

import RegisterForm from './form'
import Success from './success'

@observer
class Register extends Component {
  render () {
    return (
      <Provider userStore={userStore}>
        <section className='section register-component'>
          {userStore.registered ? <Success /> : <RegisterForm />}
        </section>
      </Provider>
    )
  }
}

export default Register
