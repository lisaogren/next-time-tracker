import { observable, computed, action } from 'mobx'
import { isEmpty, last, merge, filter, map, sortBy, first } from 'lodash'
import { isSameDay, setMinutes, setHours, getHours, getMinutes } from 'date-fns'

import { getCumulatedWorkTime, millisecondsToDecimalHours } from 'utils/date'
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
    const entry = first(this.data.settings)

    if (!entry) return this.data.settings

    const date = entry.start

    return map(this.data.settings, entry => {
      const { id, type } = entry
      let hours = getHours(entry.start)
      let minutes = getMinutes(entry.start)

      const start = setMinutes(setHours(date, hours), minutes)

      hours = getHours(entry.end)
      minutes = getMinutes(entry.end)

      const end = setMinutes(setHours(date, hours), minutes)

      return { start, end, id, type }
    })
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

  @computed get normalWorkDay () {
    return millisecondsToDecimalHours(
      getCumulatedWorkTime(this.settings)
    )
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

    let entries

    const user = this.app.userStore.user.id
    const settings = this.settings

    if (!isEmpty(settings)) {
      entries = map(settings, ({ start, end }) => {
        let hours = getHours(start)
        let minutes = getMinutes(start)

        start = setMinutes(setHours(date, hours), minutes)

        hours = getHours(end)
        minutes = getMinutes(end)

        end = setMinutes(setHours(date, hours), minutes)

        return { type: 'work', start, end, user }
      })
    } else {
      entries = [
        { type: 'work', start: setMinutes(setHours(date, 8), 30), end: setMinutes(setHours(date, 12), 0), user },
        { type: 'work', start: setMinutes(setHours(date, 13), 0), end: setMinutes(setHours(date, 17), 0), user }
      ]
    }

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
