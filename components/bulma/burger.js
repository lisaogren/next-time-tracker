import { Component } from 'react'
import classnames from 'classnames'

class Burger extends Component {
  render () {
    const burgerClasses = classnames('navbar-burger', 'burger', {
      'is-active': this.props.active
    })

    return (
      <div className={burgerClasses} onClick={this.props.onClick}>
        <span />
        <span />
        <span />
      </div>
    )
  }
}

export default Burger
