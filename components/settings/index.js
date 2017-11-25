import { Component } from 'react'
import { Provider, observer } from 'mobx-react'

import { timerStore } from 'stores'

import { Section, Container } from 'components/bulma/index'
import Icon from 'components/icon'
import DetailsEdit from 'components/details/edit'

import NormalWorkDaySettings from './normal-work-day'

@observer
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
            {timerStore.adding ? <DetailsEdit add={timerStore.adding} /> : null}
            {timerStore.editing ? <DetailsEdit edit={timerStore.editing} /> : null}
          </Container>
        </Section>
      </Provider>
    )
  }
}

export default Settings
