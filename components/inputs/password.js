import { Component } from 'react'
import { isFunction } from 'lodash'
import classnames from 'classnames'

import ErrorMsg from './error-msg'

class Password extends Component {
  constructor (props) {
    super(props)

    this.state = {
      value: '',
      hidden: true
    }
  }

  render () {
    const { error, required } = this.props
    const inputClassNames = classnames('input', { 'is-danger': error })
    const iconClassNames = classnames('fa', {
      'fa-eye': this.state.hidden,
      'fa-eye-slash': !this.state.hidden
    })
    const inputType = this.state.hidden ? 'password' : 'text'

    return (
      <div className='field password-component'>
        <label className='label'>Mot de passe</label>
        <p className='control has-icons-right'>
          <input type={inputType} name='password' className={inputClassNames} placeholder='1 m0t D3 PaSs3 Tr3s C0mpL!qu3' required={required} onChange={this.onChange} />
          <a className='icon is-small is-right' onClick={this.toggle}>
            <i className={iconClassNames} />
          </a>
        </p>
        {
          error
            ? <ErrorMsg message={error} />
            : ''
        }
        <style jsx>{`
          input[name=password] + a.icon {
            pointer-events: auto;
          }
        `}</style>
      </div>
    )
  }

  onChange = e => {
    this.setState({ value: e.target.value })

    if (isFunction(this.props.onChange)) this.props.onChange(e)
  }

  toggle = e => {
    this.setState({ hidden: !this.state.hidden })
  }
}

export default Password
