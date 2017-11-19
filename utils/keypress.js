import { isFunction } from 'lodash'

class Keypress {
  constructor () {
    this.listen()
  }

  listen () {
    window.addEventListener('keypress', this._onKeyPress)
  }

  stop () {
    window.removeEventListener('keypress', this._onKeyPress)
  }

  _onKeyPress = (...args) => {
    if (isFunction(this.onKeyPress)) this.onKeyPress(...args)
  }
}

export default Keypress
