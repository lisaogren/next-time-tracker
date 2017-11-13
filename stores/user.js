import { observable, computed, action, createTransformer } from 'mobx'

import { get, first, upperFirst } from 'lodash'

import api from 'utils/api'
import gravatar from 'utils/gravatar'

class UserStore {
  @observable data = {}

  constructor () {
    this.reset()
  }

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
    } catch (err) {
      console.log('Logout error', err.response)

      // todo: Display technical error
    }
  }

  @action me = async () => {
    const response = await api.me()

    this.data.user = response.data

    if (this.data.user) {
      this.data.loggedIn = true
    }
  }

  @action reset () {
    this.data = {
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

const store = new UserStore()

export { store as userStore, UserStore }
export default store
