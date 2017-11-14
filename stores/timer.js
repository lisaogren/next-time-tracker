import { observable, computed, action } from 'mobx'
import { isEmpty, last, merge } from 'lodash'

import api from 'utils/api'

class TimerStore {
  userStore = null
  @observable data = {
    entries: []
  }

  constructor (userStore) {
    this.userStore = userStore
  }

  @computed get entries () {
    return this.data.entries
  }

  @computed get entriesIsEmpty () {
    return isEmpty(this.entries)
  }

  @computed get isStarted () {
    const entry = last(this.entries)

    return entry && entry.start && !entry.end
  }

  @action start = async (user) => {
    const data = {
      type: 'work',
      start: new Date(),
      end: null,
      user: user.id
    }

    const response = await api.addEntry({ data })

    this.entries.push(response.data)
  }

  @action stop = async () => {
    let entry = last(this.entries)

    if (!entry) throw new Error('[stores/timer] Could not find last entry')

    const params = { id: entry.id }
    const data = { end: new Date() }

    const response = await api.updateEntry({ params, data })

    entry = merge(entry, response.data)
  }
}

export { TimerStore }
export default TimerStore
