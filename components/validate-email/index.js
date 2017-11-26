import Link from 'next/link'
import { Component } from 'react'
import { observer } from 'mobx-react'

import { userStore } from 'stores'

import { Section, Container, Content } from 'components/bulma'
import Icon from 'components/icon'

@observer
class ValidateEmail extends Component {
  render () {
    return (
      <Section>
        <Container>
          <Content className='has-text-centered'>
            <h3>
              <Icon name='check' />
              <span>E-mail validé !</span>
            </h3>
            {this.message()}
          </Content>
        </Container>
        <style jsx>{`
          h3 > span {
            margin-left: .5rem;
          }
        `}</style>
      </Section>
    )
  }

  message () {
    const { loggedIn } = userStore

    if (loggedIn) {
      return (
        <p>
          Tu peux maintenant utiliser Time Tracker sans limite.<br />
          Rendez-vous sur le {this.link('dashboard')} ou les {this.link('details')} pour enregistrer des périodes de travail.
        </p>
      )
    }

    return (
      <p>
        Il ne te reste plus qu'a te connecter via
        &nbsp;
        <Link href='/login'>
          <a>le formulaire de connexion</a>
        </Link>
        &nbsp;
        pour utiliser Time Tracker !
      </p>
    )
  }

  link (name) {
    const labels = {
      dashboard: 'résumé',
      details: 'détails'
    }
    const href = `/${name}`

    return (
      <Link href={href}>
        <a>{labels[name]}</a>
      </Link>
    )
  }
}

export default ValidateEmail
