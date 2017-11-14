import { Component } from 'react'
import { observer } from 'mobx-react'

import { appStore as app } from 'stores'

import { Container } from 'components/bulma'
import Header from './header'
// import Loading from './loading'

@observer
class Layout extends Component {
  render () {
    // console.log('is loading', app.isLoading)

    // const view = app.isLoading
    //   ? <Loading />
    //   : this.props.children

    return (
      <Container fluid>
        <Header />
        {this.props.children}
      </Container>
    )
  }
}

export default Layout
