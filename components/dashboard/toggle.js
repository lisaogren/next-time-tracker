import { Component } from 'react'
import { inject, observer } from 'mobx-react'
import classnames from 'classnames'

import Icon from 'components/icon'

@inject('timerStore', 'userStore') @observer
class Toggle extends Component {
  constructor (props) {
    super(props)
    this.timer = props.timerStore
  }

  render () {
    const classes = classnames('button', 'is-large', {
      'is-primary': !this.timer.isStarted,
      'is-info': this.timer.isStarted
    })

    return (
      <p className='has-text-centered'>
        <button className={classes} onClick={this.toggle}>
          <Icon name={this.timer.isStarted ? 'stop' : 'play'} />
          <span>
            {this.timer.isStarted ? `Arrêter` : `C'est parti !`}
          </span>
        </button>
      </p>
    )
  }

  toggle = (e) => {
    e.preventDefault()

    const { user } = this.props.userStore

    if (this.timer.isStarted) {
      this.timer.stop()
    } else {
      this.timer.start(user)
    }
  }
}

export default Toggle
