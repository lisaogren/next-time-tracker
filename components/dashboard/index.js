import { Component } from 'react'
import { observer } from 'mobx-react'

import timerStore from 'stores/timer'

import { Section, Container } from 'components/bulma'
import Icon from 'components/icon'
import Balance from 'components/balance'

import Toggle from './toggle'
import Empty from './empty'

@observer
class Dashboard extends Component {
  render () {
    return (
      <Section className='dashboard-component'>
        <Container>
          {timerStore.entriesIsEmpty ? <Empty /> : this.dashboard()}
          <hr />
          <Toggle />
        </Container>
      </Section>
    )
  }

  dashboard () {
    return (
      <div>
        <h1 className='title has-text-centered'>
          <Icon name='area-chart' size='medium' />
          <span>Résumé</span>
        </h1>

        <hr />

        <h2 className='subtitle'>
          Heures Supp'
        </h2>
        <div className='columns resume'>
          <div className='column is-half-mobile'>
            <p>Aujourd'hui</p>
          </div>
          <div className='column is-half-mobile'>
            <Balance value={15 * 60 * 1000} showSign />
          </div>
        </div>
        <div className='columns resume'>
          <div className='column is-half-mobile'>
            <p>Total</p>
          </div>
          <div className='column is-half-mobile'>
            <Balance value={125 * 60 * 1000} showSign />
          </div>
        </div>

        <hr />

        <h2 className='subtitle'>
          Temps travaillé
        </h2>
        <div className='columns resume'>
          <div className='column is-half-mobile'>
            <p>Aujourd'hui</p>
          </div>
          <div className='column is-half-mobile'>
            <Balance value={232 * 60 * 1000} />
          </div>
        </div>

        <style jsx>{`
          .resume {
            display: flex !important;

            .column {
              &:first-child {
                text-align: right;
              }
              &:last-child {
                p {
                  padding-left: 1rem;
                }
              }
            }
          }
        `}</style>
      </div>
    )
  }
}

export default Dashboard
