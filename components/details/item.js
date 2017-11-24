import { Component } from 'react'
import { inject } from 'mobx-react'
import { filter } from 'lodash'
import classnames from 'classnames'

import isSameDay from 'date-fns/is_same_day'

import { format, getWorkTimeBalance, isWorkDay } from 'utils/date'

import Balance from 'components/balance'
import Icon from 'components/icon'
import TimeStrip from 'components/time-strip'

@inject('timerStore')
class DetailsItem extends Component {
  constructor (props) {
    super(props)
    this.timer = props.timerStore
  }

  render () {
    const { date, entries } = this.props

    const workTime = getWorkTimeBalance(entries, date)
    const trClasses = classnames('entry', {
      'is-weekend': !isWorkDay(date)
    })

    const deleteBtn = (
      <button className='button is-danger is-inverted' onClick={this.clearWorkTime}>
        <Icon name='trash-o' />
      </button>
    )

    return (
      <tr className={trClasses}>
        <td className='entry-info'>
          <span className='date'>
            {format(date, 'dddd')}<br />
            {format(date, 'DD/MM/YYYY')}
          </span>
          <span className='balance'>
            <Balance value={workTime} showSign />
          </span>
          <span className='actions'>
            <button className='button is-primary is-inverted' onClick={this.setNormalWorkTime}>
              <Icon name='plus' />
            </button>
            {entries.length ? deleteBtn : null}
          </span>
        </td>
        <td className='time-strip-container'>
          <TimeStrip date={date} entries={entries} add={this.add} edit={this.edit} />
        </td>

        <style jsx>{`
          .entry {
            &:hover {
              background-color: #fafafa;

              .entry-info .actions {
                visibility: visible;
              }
            }

            .entry-info {
              display: flex;
              align-items: center;

              .date {
                flex-grow: 0;
              }

              .balance, .actions {
                flex-grow: 1;
                text-align: center;
              }

              .actions {
                visibility: hidden;
                text-align: right;
                padding-right: 1rem;
                max-width: 150px;
              }
            }

            &.is-weekend {
              background-color: #f5f5f5;

              &:hover {
                background-color: #fafafa;
              }
            }
          }
        `}</style>
      </tr>
    )
  }

  add = () => {
    this.timer.add({
      type: 'work',
      date: this.props.date
    })
  }

  edit = (entry) => {
    if (!entry.end) {
      return window.alert(`Impossible de modifier une période en cours.\nVa sur le résumé pour arrêter le timer d'abord.`)
    }

    this.timer.edit(entry)
  }

  setNormalWorkTime = () => {
    const { date, entries } = this.props
    const hasEntries = filter(entries, entry => isSameDay(entry.start, date))

    const needsConfirm = Boolean(hasEntries.length)
    let userConfirm = true

    if (needsConfirm) {
      userConfirm = window.confirm(
        `Es-tu sûr de vouloir remplacer les entrées actuelles du ${format(date, 'DD MMMM YYYY')} ?`
      )
    }

    if (userConfirm) this.timer.setNormalWorkTime(date)
  }

  clearWorkTime = (e) => {
    const { date } = this.props

    const userConfirm = window.confirm(
      `Es-tu sûr de vouloir supprimer les entrées du ${format(date, 'DD MMMM YYYY')} ?`
    )

    if (userConfirm) this.timer.clearWorkTime(date)
  }
}

export default DetailsItem
