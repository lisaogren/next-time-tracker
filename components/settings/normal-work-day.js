import { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { first, map } from 'lodash'
import { getHours, getMinutes, setHours, setMinutes } from 'date-fns'
import { getCumulatedWorkTime, millisecondsToDuration } from 'utils/date'

import TimeStrip from 'components/time-strip/index'

import DetailsEdit from 'components/details/edit'

@inject('timerStore') @observer
class NormalWorkDaySettings extends Component {
  constructor (props) {
    super(props)

    this.timer = props.timerStore
  }

  render () {
    let date
    let entries
    const entry = first(this.timer.settings)

    // WTF!?
    if (entry) {
      date = entry.start

      entries = map(this.timer.settings, entry => {
        const { id, type } = entry
        let hours = getHours(entry.start)
        let minutes = getMinutes(entry.start)

        const start = setMinutes(setHours(date, hours), minutes)

        hours = getHours(entry.end)
        minutes = getMinutes(entry.end)

        const end = setMinutes(setHours(date, hours), minutes)

        return { start, end, id, type }
      })

      console.log(entries)
    }

    const totalWorkTime = millisecondsToDuration({
      time: getCumulatedWorkTime(entries)
    })

    return (
      <form className='form normal-work-day-component'>
        <div className='columns'>
          <div className='column is-half-desktop is-offset-3-desktop is-three-fifths-tablet is-offset-one-fifth-tablet'>
            <div className='field'>
              <label className='label'>Journée type</label>
              <div className='control time-strip-control'>
                <TimeStrip date={date} entries={entries} add={this.add} edit={this.edit} />
              </div>
              <div className='control'>
                <b>Heures à travailler :</b> {totalWorkTime}
              </div>
            </div>
          </div>
        </div>
        {this.timer.adding ? <DetailsEdit add={this.timer.adding} /> : null}
        {this.timer.editing ? <DetailsEdit edit={this.timer.editing} /> : null}
        <style jsx>{`
          .time-strip-control {
            padding: 1rem;
            border: black solid 1px;
            margin-bottom: .5rem;
          }
        `}</style>
      </form>
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
