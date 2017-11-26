import { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { first, map, isEmpty } from 'lodash'
import { getCumulatedWorkTime, millisecondsToDuration } from 'utils/date'

import TimeStrip from 'components/time-strip/index'

@inject('timerStore') @observer
class NormalWorkDaySettings extends Component {
  constructor (props) {
    super(props)

    this.timer = props.timerStore
  }

  render () {
    let date
    const entries = this.timer.settings
    const entry = first(entries)

    if (entry) date = entry.start

    return (
      <form className='form normal-work-day-component'>
        <div className='columns'>
          <div className='column is-half-desktop is-offset-3-desktop is-three-fifths-tablet is-offset-one-fifth-tablet'>
            <div className='field'>
              <label className='label'>Journée type</label>
              <p>
                Défini les horaires et la durée d'une journée typique de travail.<br />
                Les calculs d'heures supplémentaires dépendent de ce paramètres.<br />
                <em>Par défaut, la journée type est défini d'une durée de 7h30.</em>
              </p>
              <div className='control time-strip-control'>
                <TimeStrip date={date} entries={entries} add={this.add} edit={this.edit} />
              </div>
              {this.totalWorkTime()}
            </div>
          </div>
        </div>
        <style jsx>{`
          .time-strip-control {
            padding: 1rem;
            border: black solid 1px;
            margin-top: .5rem;
            margin-bottom: .5rem;
          }
        `}</style>
      </form>
    )
  }

  totalWorkTime () {
    const entries = this.timer.settings

    if (isEmpty(entries)) return null

    const totalWorkTime = millisecondsToDuration({
      time: getCumulatedWorkTime(entries)
    })

    return (
      <div className='control'>
        <b>Durée totale :</b> {totalWorkTime}
      </div>
    )
  }

  add = () => {
    this.timer.add({
      type: 'settings'
    })
  }

  edit = (entry) => {
    this.timer.edit(entry)
  }
}

export default NormalWorkDaySettings
