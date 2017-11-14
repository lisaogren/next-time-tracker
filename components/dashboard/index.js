import { Component } from 'react'
import { Provider, observer } from 'mobx-react'

import { userStore, timerStore } from 'stores'

import { Section, Container } from 'components/bulma'

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
