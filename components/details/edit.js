import { Component } from 'react'
import { inject, observer } from 'mobx-react'

import Icon from 'components/icon'
import DateField from 'components/date-field'

@inject('timerStore') @observer
class DetailsEdit extends Component {
  constructor (props) {
    super(props)
    this.timer = props.timerStore
    this.state = {
      data: this.props.edit || this.props.add,
      edit: Boolean(this.props.edit)
    }
  }

  render () {
    const { edit, data } = this.state

    return (
      <form onSubmit={this.save}>
        <div className='modal is-active'>
          <div className='modal-background' onClick={this.close} />
          <div className='modal-card'>
            <header className='modal-card-head'>
              <p className='modal-card-title'>
                {edit ? 'Modifier' : 'Ajouter'} une période
              </p>
              <button type='button' className='delete' aria-label='close' onClick={this.close} />
            </header>
            <section className='modal-card-body'>
              <DateField name='start-date' label='Début' date={data.start || data.date} onChange={start => this.setState({ start })} />
              <DateField name='end-date' label='Fin' date={data.end || data.date} onChange={end => this.setState({ end })} />
            </section>
            <footer className='modal-card-foot'>
              <button type='submit' className='button is-success'>
                <Icon name='check' />
                <span>{edit ? 'Sauvegarder' : 'Ajouter'}</span>
              </button>
              {this.deleteBtn()}
              <button type='button' className='button' onClick={this.close}>
                <Icon name='close' />
                <span>Annuler</span>
              </button>
            </footer>
          </div>
        </div>
        <style jsx>{`
          .modal-card-foot {
            justify-content: center;
          }
        `}</style>
      </form>
    )
  }

  deleteBtn () {
    if (!this.state.edit) return null

    return (
      <button type='button' className='button is-danger' onClick={this.del}>
        <Icon name='trash-o' />
        <span>Supprimer</span>
      </button>
    )
  }

  save = (e) => {
    e.preventDefault()

    const { id } = this.state.data
    const { start, end } = this.state

    this.timer.save({ id, start, end })
  }

  close = () => {
    this.timer.resetEdit()
  }

  del = () => {
    this.timer.del(this.state.data.id)
  }
}

export default DetailsEdit
