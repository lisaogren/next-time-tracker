import { Component } from 'react'
import { Provider } from 'mobx-react'

import { userStore } from 'stores'

import { Section, Container } from 'components/bulma'
import Icon from 'components/icon'

import UserForm from './user'

class Profile extends Component {
  render () {
    return (
      <Provider userStore={userStore}>
        <Section className='profile-component'>
          <Container>
            <h1 className='title has-text-centered'>
              <Icon name='user-o' />
              <span>Profil</span>
            </h1>
            <hr />
            <UserForm />
          </Container>
        </Section>
      </Provider>
    )
  }
}

export default Profile
