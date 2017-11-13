import { Component } from 'react'

import { Container } from 'components/bulma'
import Header from './header'

class Layout extends Component {
  render () {
    return (
      <Container fluid>
        <Header />
        {this.props.children}
      </Container>
    )
  }
}

export default Layout
