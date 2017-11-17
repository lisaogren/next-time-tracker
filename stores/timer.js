import { observable, computed, action } from 'mobx'
import { isEmpty, last, merge, filter, map, sortBy } from 'lodash'

import { isSameDay, setMinutes, setHours } from 'date-fns'

import api from 'utils/api'

class TimerStore {
  constructor (appStore) {
    this.app = appStore
  }

  // ----------------
  // Data
  // ----------------

  app = null

  @observable data = {
    entries: []
  }

  // ----------------
  // Computations
  // ----------------

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

  // ----------------
  // Actions
  // ----------------

  @action setEntries = (entries) => {
    this.data.entries = sortBy(entries, ['start'])
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

  @action setNormalWorkTime = async (date) => {
    await this.deleteEntries(date)

    const user = this.app.userStore.user.id
    const entries = [
      { type: 'work', start: setMinutes(setHours(date, 8), 30), end: setMinutes(setHours(date, 12), 0), user },
      { type: 'work', start: setMinutes(setHours(date, 13), 0), end: setMinutes(setHours(date, 17), 0), user }
    ]

    Promise.all(
      map(entries, data => api.addEntry({ data }))
    )
      .then(() => this.app.userStore.me())
  }

  @action clearWorkTime = async (date) => {
    await this.deleteEntries(date)

    this.app.userStore.me()
  }

  deleteEntries (date) {
    const entries = filter(this.entries, entry => isSameDay(entry.start, date))

    return Promise.all(map(entries, entry => api.deleteEntry({ params: { id: entry.id } })))
  }
}

export { TimerStore }
export default TimerStore
