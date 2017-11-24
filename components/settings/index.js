import { Component } from 'react'
import { Provider } from 'mobx-react'

import { timerStore } from 'stores'

import { Section, Container } from 'components/bulma/index'
import Icon from 'components/icon'

import NormalWorkDaySettings from './normal-work-day'

class Settings extends Component {
  render () {
    return (
      <Provider timerStore={timerStore}>
        <Section className='settings-component'>
          <Container>
            <h1 className='title has-text-centered'>
              <Icon name='cog' />
              <span>Paramètres</span>
            </h1>
            <hr />
            <NormalWorkDaySettings />
          </Container>
        </Section>
      </Provider>
    )
  }
}

export default Settings
