import { Component } from 'react'

// import userStore from 'stores/user'

import Header from './header'

class Layout extends Component {
  render () {
    return (
      <div className='container'>
        <Header />
        {this.props.children}
      </div>
    )
  }
}

export default Layout
