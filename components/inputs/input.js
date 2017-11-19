import { Component } from 'react'
import classnames from 'classnames'

class Input extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: props.value || ''
    }
  }

  render () {
    const { type, name, placeholder, hasError } = this.props
    const attrs = { type, name, placeholder }

    const inputClasses = classnames('input', { 'is-danger': hasError })

    return (
      <div className='control'>
        <input {...attrs} value={this.state.value} className={inputClasses} required onChange={this.handleChange} />
      </div>
    )
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value })
  }
}

export default Input
