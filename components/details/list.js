import { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { map, filter } from 'lodash'

import eachDay from 'date-fns/each_day'
import endOfMonth from 'date-fns/end_of_month'
import startOfMonth from 'date-fns/start_of_month'
import isSameDay from 'date-fns/is_same_day'

import DetailsItem from './item'

@inject('timerStore') @observer
class DetailsList extends Component {
  constructor (props) {
    super(props)

    this.timer = props.timerStore
  }

  render () {
    const date = new Date(2017, 10)
    const days = map(
      eachDay(startOfMonth(date), endOfMonth(date)),
      day => ({ date: day, entries: filter(this.timer.entries, entry => isSameDay(entry.start, day)) })
    )

    return map(days, day => <DetailsItem key={day.date.getTime()} {...day} />)
  }
}

export default DetailsList
