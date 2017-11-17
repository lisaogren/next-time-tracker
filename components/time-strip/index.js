import { Component } from 'react'
import { inject } from 'mobx-react'
import { forEach, range } from 'lodash'
import { setHours, startOfDay } from 'date-fns'
import classnames from 'classnames'

import { differenceInDecimalHours } from 'utils/date'

const oneHourInPercent = 100 / 14

@inject('timerStore')
class TimeStrip extends Component {
  constructor (props) {
    super(props)
    this.timer = props.timerStore
  }

  render () {
    return (
      <div className='time-strip-component'>
        {this.scaleBlocks()}
        {this.workBlocks()}
        <style jsx global>{`
          .columns:last-child {
            margin-bottom: 0.75rem;
          }
        `}</style>
      </div>
    )
  }

  workBlocks () {
    const { date, entries } = this.props

    const start = setHours(startOfDay(date), 6)
    const blocks = []

    forEach(entries, (entry) => {
      if (entry.end) {
        const left = oneHourInPercent * differenceInDecimalHours(entry.start, start)
        const width = (oneHourInPercent * differenceInDecimalHours(entry.end, start)) - left

        blocks.push({ left, width, entry })
      }
    })

    return (
      <div className='columns work'>
        {blocks.map(this.workBlock)}
        <style jsx>{`
          .work {
            position: relative;
            height: 1rem;
            margin-top: -0.5rem;
          }
        `}</style>
      </div>
    )
  }

  workBlock (block) {
    const left = `${block.left}%`
    const width = `${block.width}%`

    return (
      <div
        key={block.entry.id}
        className='column worked'
        data-id={block.entry.id}
        data-type='worked'
        style={{ left, width }}
        title='Click pour modifier cette période'
      >
        <style jsx>{`
          .worked {
            position: absolute;
            top: 0;
            background: green;
            flex-grow: unset;
            flex-basis: unset;
            padding: 0;
            height: 100%;
          }
        `}</style>
      </div>
    )
  }

  scaleBlocks () {
    const hours = range(0, 24, 2)

    return (
      <div className='columns is-mobile scale'>
        {hours.map(this.scaleBlock)}
        <style jsx>{`
          .scale {
            font-size: 0.9rem;
            margin-top: -0.25rem;
          }
        `}</style>
      </div>
    )
  }

  scaleBlock (i) {
    const classes = classnames('column', {
      'is-hidden': i < 6 || i > 19
    })
    return (
      <div key={i} className={classes}>
        {i}h
        <style jsx>{`
          .column {
            padding: 0 0 0 0.25rem;
            border-left: black solid 1px;
            box-sizing: border-box;
          }
        `}</style>
      </div>
    )
  }
}

export default TimeStrip
