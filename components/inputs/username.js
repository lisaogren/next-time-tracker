import Input from './input'
import ErrorMsg from './error-msg'

const Username = (props) => (
  <div className='field'>
    <label className='label'>Nom d'utilisateur</label>
    <Input type='text' name='username' placeholder='Jean-Michel' hasError={props.error} value={props.value} />
    {
      props.error
        ? <ErrorMsg message={props.error} />
        : ''
    }
  </div>
)

export default Username
