import { Component } from 'react'
import { inject, observer } from 'mobx-react'

import { filter, first, last } from 'lodash'

import isToday from 'date-fns/is_today'
import isSameDay from 'date-fns/is_same_day'
import { getWorkTimeBalance, findPreviousWorkedDay, getCumulatedWorkTime } from 'utils/date'

import Balance from 'components/balance'

@inject('timerStore') @observer
class Summary extends Component {
  constructor (props) {
    super(props)
    this.timer = props.timerStore
  }

  render () {
    return (
      <div>
        <h2 className='subtitle'>
          Heures Supp'
        </h2>
        <div className='columns resume'>
          <div className='column is-half-mobile'>
            <p>Aujourd'hui</p>
          </div>
          <div className='column is-half-mobile'>
            <Balance value={this.getBalance('today')} showSign />
          </div>
        </div>
        <div className='columns resume'>
          <div className='column is-half-mobile'>
            <p>Total</p>
          </div>
          <div className='column is-half-mobile'>
            <Balance value={this.getBalance('total')} showSign />
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
            <Balance value={this.getWorkTime()} />
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

  getBalance (type) {
    const now = new Date()
    let { entries, normalWorkDay } = this.timer

    let start
    let end

    if (!entries) return 0

    if (type === 'today') {
      start = now
      end = now
      entries = filter(entries, entry => isToday(entry.start))
    } else if (type === 'total') {
      const lastEntry = last(entries)
      const firstEntry = first(entries)

      start = firstEntry.start
      end = lastEntry.end || now

      if (!isSameDay(lastEntry.start, firstEntry.start)) {
        end = findPreviousWorkedDay(now, entries)
        entries = filter(entries, entry => !isSameDay(entry.start, now))
      }
    }

    return getWorkTimeBalance({ entries, start, end, normalWorkDay })
  }

  getWorkTime () {
    const entries = filter(this.timer.entries, entry => isToday(entry.start))

    return getCumulatedWorkTime(entries)
  }
}

export default Summary
