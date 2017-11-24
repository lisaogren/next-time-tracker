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
    add: null,
    edit: null,
    entries: [],
    settings: []
  }

  // ----------------
  // Computations
  // ----------------

  @computed get entries () {
    return this.data.entries
  }

  @computed get settings () {
    return this.data.settings
  }

  @computed get entriesIsEmpty () {
    return isEmpty(this.entries)
  }

  @computed get isStarted () {
    const entry = last(this.entries)

    return entry && entry.start && !entry.end
  }

  @computed get adding () {
    return this.data.add
  }

  @computed get editing () {
    return this.data.edit
  }

  // ----------------
  // Actions
  // ----------------

  @action setEntries = (entries) => {
    const workEntries = filter(entries, { type: 'work' })
    const settingEntries = filter(entries, { type: 'settings' })

    this.data.entries = sortBy(workEntries, ['start'])
    this.data.settings = sortBy(settingEntries, ['start'])
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

  @action add = ({ type, date }) => {
    date = date || new Date()
    this.data.add = { type, date }
  }

  @action edit = (entry) => {
    this.data.edit = entry
  }

  @action resetEdit = () => {
    this.data.edit = null
    this.data.add = null
  }

  @action save = async ({ id, type, start, end }) => {
    const user = this.app.userStore.user.id
    const data = { type, start, end, user }

    // @TODO Handle network errors
    let response
    if (id) {
      const params = { id }
      response = await api.updateEntry({ params, data })
    } else {
      response = await api.addEntry({ data })
    }

    this.resetEdit()

    this.app.userStore.me()
  }

  @action del = async (id) => {
    const params = { id }

    try {
      await api.deleteEntry({ params })
    } catch (err) {
      // Do something with error
    }

    this.resetEdit()
    this.app.userStore.me()
  }

  @action setNormalWorkTime = async (date) => {
    await this.deleteEntries(date)

    const user = this.app.userStore.user.id
    const entries = [
      { type: 'work', start: setMinutes(setHours(date, 8), 30), end: setMinutes(setHours(date, 12), 0), user },
      { type: 'work', start: setMinutes(setHours(date, 13), 0), end: setMinutes(setHours(date, 17), 0), user }
    ]

    await this.addEntries(entries)

    this.app.userStore.me()
  }

  @action clearWorkTime = async (date) => {
    await this.deleteEntries(date)

    this.app.userStore.me()
  }

  addEntries (entries) {
    return Promise.all(
      map(entries, data => api.addEntry({ data }))
    )
  }

  deleteEntries (date) {
    const entries = filter(this.entries, entry => isSameDay(entry.start, date))

    return Promise.all(map(entries, entry => api.deleteEntry({ params: { id: entry.id } })))
  }
}

export { TimerStore }
export default TimerStore
