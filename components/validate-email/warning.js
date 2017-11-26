import { Component } from 'react'
import { observer } from 'mobx-react'

import { userStore } from 'stores'

import { Section, Container } from 'components/bulma/index'
import Icon from 'components/icon'

@observer
class ValidateEmailWarning extends Component {
  render () {
    const { loggedIn, isEmailValidated } = userStore

    if (!loggedIn) return null
    if (isEmailValidated) return null

    return (
      <Section style={{ paddingBottom: 0 }}>
        <Container>
          <div className='notification is-info validate-email-warning'>
            <span>
              <span className='icon-container'>
                <Icon name='envelope-o' fontSize='2rem' />
              </span>
              <span>
                Tu n'as pas validé ton adresse e-mail.
                Clique le lien dans l'e-mail de bienvenu que tu as reçu après avoir créé ton compte.<br />
                <a onClick={this.resendEmailValidation}>Recevoir le lien de validation à nouveau</a>
              </span>
            </span>
          </div>
        </Container>
        <style jsx>{`
          .validate-email-warning {
            padding: .5rem;

            > span {
              display: flex;
              align-items: center;

              .icon-container {
                margin-left: .5rem;
                margin-right: 1rem;
              }
            }
          }
        `}</style>
      </Section>
    )
  }

  resendEmailValidation = e => {
    e.preventDefault()

    userStore.resendEmailValidation().then(() => {
      window.alert('E-mail de validation renvoyé')
    })
  }
}

export default ValidateEmailWarning
