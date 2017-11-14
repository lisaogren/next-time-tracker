import { Component } from 'react'
import { observer } from 'mobx-react'

import { userStore } from 'stores'

import Layout from 'components/layout'
import Welcome from 'components/welcome'
import Dashboard from 'components/dashboard'

@observer
class IndexPage extends Component {
  render () {
    const { loggedIn } = userStore

    return (
      <Layout>
        {loggedIn ? <Dashboard /> : <Welcome />}
      </Layout>
    )
  }
}

export default IndexPage
