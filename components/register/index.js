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
      <section className='section register-component'>
        {this.store.registered ? <RegisterSuccess /> : this.form()}
      </section>
    )
  }

  form () {
    return (
      <div className='container'>
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
