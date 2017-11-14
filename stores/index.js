import { observable, computed, action } from 'mobx'

import { UserStore } from './user'
import { TimerStore } from './timer'

class App {
  userStore = null
  timerStore = null

  @observable data = {
    loading: true
  }

  constructor () {
    this.userStore = new UserStore(this)
    this.timerStore = new TimerStore(this)

    this.userStore.me(() => this.setLoading(false))
  }

  @computed get isLoading () {
    return this.data.loading
  }

  @action setLoading = (loading) => {
    this.data.loading = loading
  }
}

const appStore = new App()
const userStore = appStore.userStore
const timerStore = appStore.timerStore

export {
  appStore,
  userStore,
  timerStore
}
export default appStore
