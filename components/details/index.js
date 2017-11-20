import { Component } from 'react'
import { Provider, observer } from 'mobx-react'
import { getYear, getMonth } from 'date-fns'

import { timerStore } from 'stores'

import { Section, Container } from 'components/bulma'
import Icon from 'components/icon'
import DateSelector from 'components/date-selector'

import DetailsList from './list'
import DetailsEdit from './edit'

@observer
class Details extends Component {
  constructor (props) {
    super(props)

    const date = new Date()
    const year = getYear(date)
    const month = getMonth(date)

    this.state = { year, month }
  }

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
            <div className='has-text-right'>
              <DateSelector {...this.state} onChange={this.selectDate} />
            </div>
            <table className='table is-fullwidth entries'>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Entrées</th>
                </tr>
              </thead>
              <tbody>
                <DetailsList {...this.state} />
              </tbody>
            </table>
            {timerStore.adding ? <DetailsEdit add={timerStore.adding} /> : null}
            {timerStore.editing ? <DetailsEdit edit={timerStore.editing} /> : null}
          </Container>
        </Section>
      </Provider>
    )
  }

  selectDate = ({ year, month }) => {
    console.log(year, month)
    this.setState({ year, month })
  }
}

export default Details
