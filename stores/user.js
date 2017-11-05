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

  @computed get username () {
    return this.data.user.username
  }

  @computed get gravatar () {
    return gravatar.url(this.data.user.email)
  }

  @computed get registered () {
    return this.data.register.success
  }

  // @computed get hasError () {
  //   return attr => {
  //     const invalidation = first(this.data.register.invalidAttributes[attr])
  //     attr = attr === 'username' ? 'User' : upperFirst(attr)

  //     return invalidation && invalidation.message === `Error.Passport.${attr}.Exists`
  //   }
  // }

  hasError = createTransformer(attr => {
    const invalidation = first(this.data.register.invalidAttributes[attr])
    attr = attr === 'username' ? 'User' : upperFirst(attr)

    const re = new RegExp(`^Error.Passport.${attr}.(Exists|Short)$`)

    return invalidation && re.test(invalidation.message)
  })

  // ----------------
  // Actions
  // ----------------

  @action register = async ({ username, email, password }) => {
    let response
    const data = { username, email, password }

    try {
      response = await api.register({ data })

      this.data.user = response.data
      this.data.register.success = true
    } catch (err) {
      console.log('Register error', err.response)

      const reason = err.response.data

      this.data.register.error = true

      if (reason.code === 'E_VALIDATION') {
        this.data.register.invalidAttributes = reason.invalidAttributes
      }
    }
  }

  @action reset () {
    this.data = {
      user: null,
      register: {
        success: false,
        error: null,
        invalidAttributes: {},
        data: {}
      }
    }
  }
}

const store = new UserStore()

export { store as userStore, UserStore }
export default store
