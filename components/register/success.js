import Link from 'next/link'
import { Component } from 'react'
import { observer, inject } from 'mobx-react'

import Icon from 'components/icon'

@inject('userStore') @observer
class RegisterSuccess extends Component {
  constructor (props) {
    super(props)

    this.store = props.userStore
  }

  render () {
    return (
      <div className='container'>
        <div className='content has-text-centered'>
          <h3>
            <span>Hey ! Bienvenue {this.store.username}</span>
            <Icon name='smile-o' />
          </h3>
          <p>
            Il ne te reste plus qu'a te connecter via
            &nbsp;
            <Link href='/login'>
              <a>le formulaire de connexion</a>
            </Link>
            &nbsp;
            pour utiliser Time Tracker !
          </p>
        </div>
        <style jsx>{`
          h3 > span {
            margin-right: .5rem;
          }
        `}</style>
      </div>
    )
  }
}

export default RegisterSuccess
