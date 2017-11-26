/* globals sails Validation */

const rand = require('random-key')

module.exports = {
  send (user, next) {
    Validation.destroy({ type: 'email', user: user.id })
      .then(() => {
        const newValidation = {
          key: rand.generate(128),
          user: user.id
        }

        Validation.create(newValidation)
          .then(createdValidation => this.sendEmail(user, createdValidation, next))
          .catch(() => next(new Error('cannot create')))
      })
      .catch(() => next(new Error('cannot reset')))
  },

  validate (key, next) {
    if (!key) {
      sails.log('services/validation: Missing key')

      return next(new Error('missing key'))
    }

    sails.log('services/validation: Validating', key)

    Validation.findOne({ key, validated: false })
      .then(validation => {
        const { id } = validation

        Validation.update({ id }, { validated: true })
          .then(validation => next(null, validation))
          .catch(err => {
            sails.log.error('services/validation: Cannot update validation', err)

            next(new Error('cannot update'))
          })
      })
      .catch(err => {
        sails.log.error('services/validation: Inexisting validation', err)

        next(new Error('cannot find validation'))
      })
  },

  sendEmail (user, validation, next) {
    const { mailgun } = sails.services

    const to = user.email
    const subject = 'Validation de compte Time Tracker'
    const html = `
      <h2>Hello ${user.username} !</h2>
      <p>Valide ton adresse e-mail en cliquant sur le lien suivant pour accéder à ton compte :</p>
      <p>
        <a href="${sails.config.appUrl}/validate-email/${validation.key}">Valider mon adresse e-mail</a>
      </p>
      <p>
        A bientôt sur <a href="${sails.config.appUrl}">Time Tracker</a>
      </p>
    `

    mailgun.send({ to, subject, html }, err => {
      if (err) return next(err)

      next()
    })
  }
}
