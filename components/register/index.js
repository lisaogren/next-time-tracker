import { Component } from 'react'
import { observer, inject } from 'mobx-react'

import RegisterForm from './form'
import RegisterFooter from './footer'
import RegisterSuccess from './success'

@inject('userStore') @observer
class Register extends Component {
  constructor (props) {
    super(props)
    this.store = props.userStore
  }

  render () {
    return (
      <section className='section'>
        <div className='container register-component'>
          {this.store.registered ? <RegisterSuccess /> : this.form()}
        </div>
      </section>
    )
  }

  form () {
    return (
      <div>
        <h1 className='title has-text-centered'>Créer ton compte !</h1>
        <hr />
        <RegisterForm />
        <hr />
        <RegisterFooter />
      </div>
    )
  }
}

export default Register
