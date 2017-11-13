import { Provider } from 'mobx-react'

import userStore from 'stores/user'

import Layout from 'components/layout'
import Register from 'components/register'

const RegisterPage = (props) => (
  <Provider userStore={userStore}>
    <Layout>
      <Register />
    </Layout>
  </Provider>
)

export default RegisterPage
