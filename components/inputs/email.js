import Input from './input'
import ErrorMsg from './error-msg'

const Email = (props) => (
  <div className='field'>
    <label className='label'>E-mail</label>
    <Input type='email' name='email' placeholder='jeanmichel@peupres.fr' hasError={props.error} value={props.value} />
    {
      props.error
        ? <ErrorMsg message={props.error} />
        : ''
    }
  </div>
)

export default Email
