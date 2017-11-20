import { Component } from 'react'
import { map, range, isFunction } from 'lodash'

import { getYear } from 'date-fns'

class DateSelector extends Component {
  months = [
    'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
    'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
  ]
  years = range(1985, getYear(new Date()) + 1)

  constructor (props) {
    super(props)

    const { year, month } = props

    this.state = { year, month }
  }

  render () {
    const { month = true, year = true } = this.props

    return (
      <div className='date-selector-component'>
        {month ? this.monthSelector() : null}
        {year ? this.yearSelector() : null}
      </div>
    )
  }

  monthSelector () {
    return (
      <div className='select'>
        <select className='month-selector' data-type='month' onChange={this.onChange} value={this.state.month}>
          {map(this.months, this.monthOption)}
        </select>
      </div>
    )
  }

  monthOption = (label, i) => {
    return (
      <option key={i} value={i}>{label}</option>
    )
  }

  yearSelector () {
    return (
      <div className='select'>
        <select className='year-selector' data-type='year' onChange={this.onChange} value={this.state.year}>
          {map(this.years, this.yearOption)}
        </select>
      </div>
    )
  }

  yearOption = (year) => {
    return (
      <option key={year} value={year}>{year}</option>
    )
  }

  onChange = e => {
    const el = e.currentTarget
    const type = el.dataset.type

    this.setState({ [type]: el.value }, () => {
      console.log('selected date')
      if (isFunction(this.props.onChange)) {
        const { year, month } = this.state
        this.props.onChange({ year, month })
      }
    })
  }
}

export default DateSelector
