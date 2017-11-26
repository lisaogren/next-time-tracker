import { Component } from 'react'
import { observer, inject } from 'mobx-react'

import Icon from 'components/icon'

@inject('userStore') @observer
class RegisterSuccess extends Component {
  constructor (props) {
    super(props)

    this.store = props.userStore
  }

  render () {
    return (
      <div className='container'>
        <div className='content has-text-centered'>
          <h3>
            <span>Hey ! Bienvenue {this.store.username}</span>
            <Icon name='smile-o' />
          </h3>
          <p>
            Tu devrais recevoir un e-mail automatique avec un lien. Clique ce lien pour valider ton adresse e-mail.
          </p>
          <p>
            Si tu n'as pas reçu l'e-mail <a onClick={this.resendEmailValidation}>clique ici</a> pour le recevoir à nouveau.
          </p>
          <p>
            Sinon tu peux fermer cette page.
          </p>
        </div>
        <style jsx>{`
          h3 > span {
            margin-right: .5rem;
          }
        `}</style>
      </div>
    )
  }

  resendEmailValidation = e => {
    e.preventDefault()

    this.store.resendEmailValidation().then(() => {
      window.alert('E-mail de validation renvoyé')
    })
  }
}

export default RegisterSuccess
