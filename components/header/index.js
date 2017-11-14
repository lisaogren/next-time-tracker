import Router from 'next/router'
import { Component } from 'react'
import { Provider } from 'mobx-react'
import nprogress from 'nprogress'

import { userStore } from 'stores'

import Brand from './brand'
import Nav from 'components/nav'

Router.onRouteChangeStart = () => nprogress.start()
Router.onRouteChangeComplete = () => nprogress.done()
Router.onRouteChangeError = () => nprogress.done()

class Header extends Component {
  constructor (props) {
    super(props)

    this.state = {
      opened: false
    }
  }

  render () {
    return (
      <Provider userStore={userStore}>
        <nav className='navbar is-primary nav-component'>
          <div className='container'>
            <Brand toggle={this.toggle} {...this.state} />
            <Nav {...this.state} />
          </div>
        </nav>
      </Provider>
    )
  }

  toggle = () => {
    this.setState(prev => ({ opened: !prev.opened }))
  }
}

export default Header
