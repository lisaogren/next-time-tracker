import { Component } from 'react'
import { observer } from 'mobx-react'
import DevTools from 'mobx-react-devtools'

// import { appStore as app } from 'stores'

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
        {process.env.NODE_ENV !== 'production' ? <DevTools /> : null}
        <style jsx global>{`
          .container > h1.title {
            display: flex;
            justify-content: center;
            align-items: center;

            .icon-component {
              margin-right: .5rem;

              i.fa {
                font-size: 1.5rem;
              }
            }
          }
        `}</style>
      </Container>
    )
  }
}

export default Layout
