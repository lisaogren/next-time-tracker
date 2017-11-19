import { Component } from 'react'
import { inject, observer } from 'mobx-react'
import classnames from 'classnames'

import Keypress from 'utils/keypress'

import Icon from 'components/icon'

@inject('timerStore', 'userStore') @observer
class Toggle extends Component {
  constructor (props) {
    super(props)
    this.timer = props.timerStore
  }

  componentDidMount () {
    this.keypress = new Keypress()
    this.keypress.onKeyPress = this.onKeyPress
  }

  componentWillUnmount () {
    this.keypress.stop()
  }

  render () {
    const classes = classnames('button', 'is-large', {
      'is-primary': !this.timer.isStarted,
      'is-info': this.timer.isStarted
    })

    const btnTitle = `Clic pour lancer le décompte de temps travaillé\n- ou -\nAppuis sur la touche espace`

    return (
      <p className='has-text-centered'>
        <button className={classes} onClick={this.toggle} title={btnTitle}>
          <Icon name={this.timer.isStarted ? 'stop' : 'play'} />
          <span>
            {this.timer.isStarted ? `Arrêter` : `C'est parti !`}
          </span>
        </button>
      </p>
    )
  }

  toggle = e => {
    e.preventDefault()

    const { user } = this.props.userStore

    if (this.timer.isStarted) {
      this.timer.stop()
    } else {
      this.timer.start(user)
    }
  }

  onKeyPress = e => {
    // Spacebar
    if (e.which === 32) {
      this.toggle(e)
    }
  }
}

export default Toggle
