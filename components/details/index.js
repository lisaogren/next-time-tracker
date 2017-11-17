import { Component } from 'react'
import { Provider } from 'mobx-react'

import { timerStore } from 'stores'

import { Section, Container } from 'components/bulma'
import Icon from 'components/icon'

import DetailsList from './list'

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
          </Container>
        </Section>
      </Provider>
    )
  }
}

export default Details
