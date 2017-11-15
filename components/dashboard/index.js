import { Component } from 'react'
import { Provider, observer } from 'mobx-react'

import { userStore, timerStore } from 'stores'

import { Section, Container } from 'components/bulma'
import Icon from 'components/icon'

import Toggle from './toggle'
import Empty from './empty'
import Summary from './summary'

const stores = {
  userStore,
  timerStore
}

@observer
class Dashboard extends Component {
  render () {
    return (
      <Provider {...stores}>
        <Section className='dashboard-component'>
          <Container>
            <h1 className='title has-text-centered'>
              <Icon name='area-chart' size='medium' />
              <span>Résumé</span>
            </h1>
            <hr />
            {timerStore.entriesIsEmpty ? <Empty /> : <Summary />}
            <hr />
            <Toggle />
          </Container>
        </Section>
      </Provider>
    )
  }
}

export default Dashboard
