import { Component } from 'react'
import { Provider, observer } from 'mobx-react'

import { timerStore } from 'stores'

import { Section, Container } from 'components/bulma'
import Icon from 'components/icon'

import DetailsList from './list'
import DetailsEdit from './edit'

@observer
class Details extends Component {
  render () {
    return (
      <Provider timerStore={timerStore}>
        <Section className='details-component'>
          <Container>
            <h1 className='title has-text-centered'>
              <Icon name='table' size='medium' />
              <span>Détails</span>
            </h1>
            <hr />
            <table className='table is-fullwidth entries'>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Entrées</th>
                </tr>
              </thead>
              <tbody>
                <DetailsList />
              </tbody>
            </table>
            {timerStore.adding ? <DetailsEdit add={timerStore.adding} /> : null}
            {timerStore.editing ? <DetailsEdit edit={timerStore.editing} /> : null}
          </Container>
        </Section>
      </Provider>
    )
  }
}

export default Details
