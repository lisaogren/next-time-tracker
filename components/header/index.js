import Head from 'next/head'
import Router from 'next/router'
import { Component } from 'react'
import { Provider, observer } from 'mobx-react'
import nprogress from 'nprogress'

import userStore from 'stores/user'

import Brand from './brand'
import Nav from './nav'

Router.onRouteChangeStart = url => {
  console.log(`Loading ${url}`)
  nprogress.start()
}
Router.onRouteChangeComplete = () => nprogress.done()
Router.onRouteChangeError = () => nprogress.done()

@observer
class Header extends Component {
  render () {
    return (
      <Provider userStore={userStore}>
        <nav className='navbar nav-component'>
          <Head>
            <link rel='stylesheet' href='/static/css/nprogress.css' />
          </Head>
          <Brand />
          <Nav />
        </nav>
      </Provider>
    )
  }
}

export default Header
