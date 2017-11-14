import Icon from 'components/icon'

const Toggle = () => {
  return (
    <p className='has-text-centered'>
      <button className='button is-large is-primary'>
        <Icon name='play' />
        <span>C'est parti !</span>
      </button>
    </p>
  )
}

export default Toggle
