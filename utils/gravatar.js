import gravatar from 'gravatar'

function url (email) {
  return gravatar.url(email, {
    protocol: 'http',
    default: 'retro',
    f: 'y'
  })
}

export default { url }
