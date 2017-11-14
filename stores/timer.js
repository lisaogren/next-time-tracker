import { observable, computed } from 'mobx'
import { isEmpty } from 'lodash'

class Timer {
  @observable data = {
    entries: []
  }

  @computed get entries () {
    return this.data.entries
  }

  @computed get entriesIsEmpty () {
    return isEmpty(this.entries)
  }
}

const store = new Timer()

export { store as timerStore, Timer }
export default store
