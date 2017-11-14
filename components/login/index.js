import { Component } from 'react'
import { Provider, observer } from 'mobx-react'

import { userStore } from 'stores'

import LoginForm from './form'
import LoginFooter from './footer'

@observer
class Login extends Component {
  render () {
    return (
      <Provider userStore={userStore}>
        <section className='section'>
          <div className='container login-component'>
            <h1 className='title has-text-centered'>Connecte-toi à ton compte !</h1>
            <hr />
            <LoginForm />
            <hr />
            <LoginFooter />
          </div>
        </section>
      </Provider>
    )
  }
}

export default Login
