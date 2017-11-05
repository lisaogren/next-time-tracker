import classnames from 'classnames'

const Input = (props) => {
  const { type, name, placeholder, hasError, value } = props
  const attrs = { type, name, placeholder }

  const inputClasses = classnames('input', { 'is-danger': hasError })

  return (
    <div className='control'>
      <input {...attrs} className={inputClasses} required />
    </div>
  )
}

export default Input
