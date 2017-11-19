import { Component } from 'react'
import { first } from 'lodash'

import Flatpickr from 'react-flatpickr'

class DateField extends Component {
  render () {
    const { label, date } = this.props

    const options = {
      enableTime: true,
      time_24hr: true
    }

    return (
      <div className='field is-horizontal'>
        <div className='field-label is-normal'>
          <label className='label'>{label}</label>
        </div>
        <div className='field-body'>
          <div className='field'>
            <div className='control'>
              <Flatpickr className='input' value={date} onChange={date => this.props.onChange(first(date))} options={options} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DateField
