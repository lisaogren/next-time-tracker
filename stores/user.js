import Router from 'next/router'
import { observable, computed, action, createTransformer } from 'mobx'

import { get, find, first, upperFirst, isFunction, extend } from 'lodash'

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
    return this.data.user || {}
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

  @computed get loginError () {
    return this.data.login.error
  }

  @computed get loaded () {
    return this.data.loaded
  }

  @computed get registered () {
    return this.data.register.success
  }

  @computed get profileUpdated () {
    return this.data.profile.updated
  }

  @computed get validations () {
    return this.user.validations
  }

  @computed get isEmailValidated () {
    const validation = find(this.validations, { type: 'email' })

    return validation && validation.validated
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

  @action resetLoginError () {
    this.data.login.error = null
  }

  @action resetProfileUpdated () {
    this.data.profile.updated = false
  }

  @action register = async ({ username, email, password }) => {
    const data = { username, email, password }

    try {
      const response = await api.register({ data })

      this.data.user = response.data
      this.data.register.success = true
    } catch (err) {
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
      const { response } = err

      if (response.status === 403) {
        this.data.login.error = 'functional'
      } else {
        this.data.login.error = 'technical'
      }
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
    // @TODO Handle errors
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

  @action updateMe = async (data) => {
    const params = { id: this.user.id }

    // Need to pass user id as data aswell or sails-auth f!&*¤° up without telling us
    data.id = this.user.id

    const response = await api.updateUser({ params, data })

    this.data.user = extend(this.data.user, response.data)
    this.data.profile.updated = true
  }

  @action resendEmailValidation = async () => {
    const { id } = this.user
    const params = { id }

    await api.resendEmailValidation({ params })

    return { ok: true }
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
        error: null
      },
      profile: {
        updated: false
      }
    }
  }
}

export { UserStore }
export default UserStore
