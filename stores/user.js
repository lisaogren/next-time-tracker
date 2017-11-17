import Router from 'next/router'
import { observable, computed, action, createTransformer } from 'mobx'

import { get, first, upperFirst, isFunction } from 'lodash'

import api from 'utils/api'
import gravatar from 'utils/gravatar'

class UserStore {
  constructor (appStore) {
    this.reset()
    this.app = appStore
  }

  // ----------------
  // Data
  // ----------------

  app = null

  @observable data = {}

  // ----------------
  // Computations
  // ----------------

  @computed get user () {
    return this.data.user
  }

  @computed get username () {
    return this.data.user.username
  }

  @computed get gravatar () {
    return gravatar.url(this.data.user.email)
  }

  @computed get loggedIn () {
    return this.data.loggedIn
  }

  @computed get loaded () {
    return this.data.loaded
  }

  @computed get registered () {
    return this.data.register.success
  }

  @computed get login () {
    return this.data.login
  }

  // @computed get hasError () {
  //   return attr => {
  //     const invalidation = first(this.data.register.invalidAttributes[attr])
  //     attr = attr === 'username' ? 'User' : upperFirst(attr)

  //     return invalidation && invalidation.message === `Error.Passport.${attr}.Exists`
  //   }
  // }

  hasRegisterError = createTransformer(attr => {
    const invalidation = first(this.data.register.invalidAttributes[attr])
    attr = attr === 'username' ? 'User' : upperFirst(attr)

    const re = new RegExp(`^Error.Passport.${attr}.(Exists|Short)$`)

    return invalidation && re.test(invalidation.message)
  })

  // ----------------
  // Actions
  // ----------------

  @action register = async ({ username, email, password }) => {
    const data = { username, email, password }

    try {
      const response = await api.register({ data })

      this.data.user = response.data
      this.data.register.success = true
    } catch (err) {
      console.log('Register error', err.response)

      const reason = get(err, 'response.data')

      this.data.register.error = true

      if (reason.code === 'E_VALIDATION') {
        this.data.register.invalidAttributes = reason.invalidAttributes
      }
    }
  }

  @action login = async ({ identifier, password }) => {
    const data = { identifier, password }

    try {
      const response = await api.login({ data })

      this.data.user = response.data
      this.data.loggedIn = true

      this.me(() => {
        Router.push('/dashboard')
      })
    } catch (err) {
      console.log('Login error', err.response)

      // todo: Display technical error
    }
  }

  @action logout = async () => {
    try {
      await api.logout()

      this.data.user = null
      this.data.loggedIn = false

      Router.push('/')
    } catch (err) {
      console.log('Logout error', err.response)

      // todo: Display technical error
    }
  }

  @action me = async (cb) => {
    const response = await api.me()

    this.data.user = response.data
    this.data.loaded = true

    if (this.data.user) {
      this.data.loggedIn = true

      // Pass user entries along to the timer store
      this.app.timerStore.setEntries(this.user.entries)
    }

    if (isFunction(cb)) cb()
  }

  @action reset () {
    this.data = {
      loaded: false,
      loggedIn: false,
      user: null,
      register: {
        success: false,
        error: null,
        invalidAttributes: {}
      },
      login: {
        success: false,
        error: null
      }
    }
  }
}

export { UserStore }
export default UserStore
